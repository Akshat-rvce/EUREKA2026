import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { execute, parseJson, transaction } from "@/lib/database";
import { currentUser, requireMaster } from "@/lib/adminServer";
import { TRACKS } from "@/config/site";
import { sameOrigin } from "@/lib/origin";

const defaults: Record<string, unknown> = {
  budget: { totalPaisa: 2500000, prizePaisa: 1500000, registrationFeePaisa: 50000, targetTeams: 60 },
  scoring_criteria: [
    { key: "innovation", label: "Innovation", weight: 20 }, { key: "technical_depth", label: "Technical depth", weight: 20 },
    { key: "working_prototype", label: "Working prototype", weight: 20 }, { key: "real_world_impact", label: "Real-world impact", weight: 20 },
    { key: "presentation", label: "Presentation", weight: 20 },
  ],
  live_control: { showScores: false, revealWinners: false, lockedTracks: [] },
};
export async function GET() {
  if (!await currentUser()) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const result = await execute("SELECT key,value_json FROM settings");
  const settings = { ...defaults };
  for (const rowValue of result.rows) { const row = rowValue as Record<string, unknown>; settings[String(row.key)] = parseJson(row.value_json, null); }
  return NextResponse.json({ settings }, { headers: { "Cache-Control": "no-store" } });
}
export async function PATCH(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid settings." }, { status: 400 }); }
  const patch = body.settings && typeof body.settings === "object" ? body.settings as Record<string, unknown> : {};
  const at = new Date().toISOString();
  try {
    await transaction(async tx => {
      for (const [key, value] of Object.entries(patch)) {
        if (!(key in defaults)) continue;
        if (key === "budget") {
          const v = value as Record<string, unknown>;
          if (![v.totalPaisa, v.prizePaisa, v.registrationFeePaisa, v.targetTeams].every(x => Number.isSafeInteger(Number(x)) && Number(x) > 0) || Number(v.prizePaisa) > Number(v.totalPaisa) || Number(v.targetTeams) > 100000) throw new Error("BAD_BUDGET");
        }
        if (key === "scoring_criteria") {
          if (!Array.isArray(value) || value.length !== 5) throw new Error("BAD_RUBRIC");
          const weights = value.map(item => Number((item as Record<string, unknown>).weight));
          if (weights.some(x => !Number.isFinite(x) || x <= 0 || x > 100) || Math.abs(weights.reduce((a,b)=>a+b,0)-100) > 0.001) throw new Error("BAD_RUBRIC");
          for (const item of value) { const v = item as Record<string, unknown>; if (!/^[a-z_]+$/.test(String(v.key)) || typeof v.label !== "string" || !v.label.trim() || v.label.length > 80) throw new Error("BAD_RUBRIC"); }
        }
        if (key === "live_control") {
          const v = value as Record<string, unknown>;
          if (typeof v.showScores !== "boolean" || typeof v.revealWinners !== "boolean" || !Array.isArray(v.lockedTracks) || v.lockedTracks.some(id => typeof id !== "string" || !TRACKS.some(t => t.id === id))) throw new Error("BAD_LIVE");
        }
        const old = await tx.execute({ sql: "SELECT value_json FROM settings WHERE key=?", args: [key] });
        const oldJson = (old.rows[0] as Record<string, unknown> | undefined)?.value_json;
        await tx.execute({ sql: "INSERT INTO settings(key,value_json,updated_by,updated_at) VALUES(?,?,?,?) ON CONFLICT(key) DO UPDATE SET value_json=excluded.value_json,updated_by=excluded.updated_by,updated_at=excluded.updated_at", args: [key, JSON.stringify(value), master.id, at] });
        await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,old_json,new_json,created_at) VALUES(?,?,?,?,?,?,?,?)", args: [randomUUID(), master.id, "settings-updated", "settings", key, oldJson == null ? null : String(oldJson), JSON.stringify(value), at] });
      }
    });
  } catch (error) {
    const message = error instanceof Error && error.message.startsWith("BAD_") ? error.message : "";
    if (message) return NextResponse.json({ error: "Check the budget, scoring weights, and live-control settings." }, { status: 400 });
    return NextResponse.json({ error: "Could not save settings." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
