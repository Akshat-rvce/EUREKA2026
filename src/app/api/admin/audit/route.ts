import { NextResponse } from "next/server";
import { execute } from "@/lib/database";
import { requireMaster } from "@/lib/adminServer";
import { parseJson } from "@/lib/database";

export async function GET() {
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  const result = await execute(`SELECT a.*,u.name AS user_name,u.email AS user_email FROM audit_log a LEFT JOIN users u ON u.id=a.user_id ORDER BY a.created_at DESC LIMIT 500`);
  return NextResponse.json({ events: result.rows.map(value => {
    const row = value as Record<string, unknown>;
    return { id: row.id, action: row.action, entity: row.entity, entityId: row.entity_id, actor: row.user_name, actorEmail: row.user_email, oldValue: parseJson(row.old_json, null), newValue: parseJson(row.new_json, null), at: row.created_at };
  }) }, { headers: { "Cache-Control": "no-store" } });
}