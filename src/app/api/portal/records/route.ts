import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { TRACKS } from "@/config/site";
import { canManageSection, PORTAL_SECTIONS } from "@/lib/adminAccess";
import { currentUser, requireMaster } from "@/lib/adminServer";
import { execute, parseJson, transaction, type Executor } from "@/lib/database";
import type { PortalUser } from "@/lib/adminServer";

const categories: Record<string, string[]> = {
  Income: ["Registration fee", "Sponsorship", "Other income"],
  Expense: ["Prize money", "Printing & posters", "Venue & setup", "Food & refreshments", "Promotion", "Certificates & trophies", "Miscellaneous"],
};
const paymentModes = ["UPI", "Cash", "Bank transfer", "Other"];
const recordFromRow = (row: Record<string, unknown>) => ({ id: String(row.id), ...parseJson<Record<string, unknown>>(row.data_json, {}), status: row.status, createdBy: row.created_by, createdByName: row.creator_name, createdByDepartment: row.creator_department, createdAt: row.created_at, updatedAt: row.updated_at, reviewedBy: row.reviewed_by, reviewedAt: row.reviewed_at, rejectReason: row.reject_reason, version: Number(row.version || 1) });
const originOk = (request: NextRequest) => !request.headers.get("origin") || request.headers.get("origin") === request.nextUrl.origin;

function validate(section: string, raw: unknown, user: PortalUser): Record<string, unknown> | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const d = raw as Record<string, unknown>;
  const text = (key: string, max: number, required = false) => {
    const value = d[key] == null ? "" : String(d[key]).trim();
    return value.length <= max && (!required || Boolean(value)) ? value : null;
  };
  if (section === "finance") {
    const type = d.type === "Income" || d.type === "Expense" ? d.type : "";
    const amount = Number(d.amountPaisa);
    const category = text("category", 80, true);
    const date = text("transaction_date", 10, true);
    const party = text("party_name", 160, true);
    const mode = text("payment_mode", 30, true);
    if (!type || !Number.isSafeInteger(amount) || amount <= 0 || amount > 100_000_000_000 || !category || !categories[type].includes(category) || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)) || new Date(`${date}T00:00:00Z`).toISOString().slice(0,10)!==date || !party || !mode || !paymentModes.includes(mode)) return null;
    const description = text("description", 2000);
    const reference = text("reference_id", 160);
    const cashHolder = text("cash_holder", 120);
    const attachmentId = text("attachment_id", 80);
    if (description === null || reference === null || attachmentId === null || cashHolder === null) return null;
    return { type, amountPaisa: amount, transaction_date: date, category, party_name: party, payment_mode: mode, cash_holder: cashHolder, reference_id: reference, description, attachment_id: attachmentId || null };
  }
  if (section === "teams") {
    const teamName = text("team_name", 160, true); const college = text("college", 180, true); const leader = text("leader_name", 120, true);
    const phone = text("phone", 40, true); const email = text("email", 320, true); const project = text("project_title", 200, true); const track = text("track", 80, true); const teamCode = text("team_code", 40);
    if (!teamName || !college || !leader || !phone || phone.replace(/\D/g,"").length<7 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !project || !TRACKS.some(t => t.id === track)) return null;
    const members = Array.isArray(d.members) ? d.members.map(String).map(v => v.trim()).filter(Boolean).slice(0, 8) : [];
    const notes = text("notes", 2000); const paymentRef = text("payment_ref", 160);
    if (notes === null || paymentRef === null || teamCode === null) return null;
    return { team_name: teamName, team_code: teamCode.toUpperCase(), college, leader_name: leader, phone, email, members, track, project_title: project, fee_paid: d.fee_paid === true, payment_ref: paymentRef, notes };
  }
  if (section === "judges") {
    const name = text("name", 120, true); const designation = text("designation", 140); const organization = text("organization", 180); const phone = text("phone", 40); const email = text("email", 320);
    if (!name || designation === null || organization === null || phone === null || email === null || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return null;
    const tracks = Array.isArray(d.tracks) ? d.tracks.filter(v => typeof v === "string" && TRACKS.some(t => t.id === v)).slice(0, 5) : [];
    return { name, designation, organization, phone, email, tracks, availability: text("availability", 300) || "" };
  }
  if (section === "scoring") {
    const teamId = text("team_id", 80, true); const trackId = text("track", 80, true); const remarks = text("remarks", 2000);
    if (!teamId || !trackId || !TRACKS.some(t => t.id === trackId) || remarks === null) return null;
    const scoreInput = d.scores && typeof d.scores === "object" && !Array.isArray(d.scores) ? d.scores as Record<string, unknown> : {};
    const scores: Record<string, number> = {};
    for (const key of ["innovation", "technical_depth", "working_prototype", "real_world_impact", "presentation"]) {
      const value = Number(scoreInput[key]); if (!Number.isInteger(value) || value < 0 || value > 10) return null; scores[key] = value;
    }
    return { team_id: teamId, track: trackId, judge_id: user.id, judge_name: user.name, scores, total: Object.values(scores).reduce((a, b) => a + b, 0), remarks };
  }
  const allowed: Record<string, string[]> = {
    tasks: ["title", "owner", "department", "due_date", "status", "priority"],
    schedule: ["time", "activity", "location", "owner"],
    volunteers: ["name", "phone", "department", "shift", "attendance"],
    logistics: ["item", "quantity_needed", "quantity_available", "owner", "status"],
    promotion: ["college_or_channel", "contact_person", "date", "status", "registrations_received"],
  };
  if (!allowed[section]) return null;
  const data: Record<string, unknown> = {};
  for (const key of allowed[section]) {
    const value = text(key, 500, ["title", "activity", "item", "name"].includes(key));
    if (value === null) return null;
    data[key] = value;
  }
  return data;
}

async function verifySpecialRecord(section: string, data: Record<string, unknown>, user: PortalUser, ignoreId?: string, tx?: Executor) {
  const query = (sql:string,args:(string|number|null)[]=[]) => tx ? tx.execute({sql,args}) : execute(sql,args);
  if (section === "finance" && data.attachment_id) {
    const attachment = await query("SELECT uploaded_by FROM attachments WHERE id=?", [String(data.attachment_id)]);
    const row = attachment.rows[0] as Record<string, unknown> | undefined;
    if (!row || (user.role !== "master" && row.uploaded_by !== user.id)) return "That receipt image is unavailable.";
  }
  if (section === "teams" && data.team_code) {
    const dup = await query("SELECT id FROM records WHERE section='teams' AND json_extract(data_json,'$.team_code')=? AND id<>COALESCE(?, '') LIMIT 1", [String(data.team_code).toUpperCase(), ignoreId || ""]);
    if (dup.rows.length) return "A registration with that team code already exists.";
    data.team_code = String(data.team_code).toUpperCase();
  }
  if (section === "scoring") {
    const team = await query("SELECT data_json,status FROM records WHERE section='teams' AND id=?", [String(data.team_id)]);
    const teamRow = team.rows[0] as Record<string, unknown> | undefined;
    if (!teamRow || teamRow.status !== "approved") return "Only approved teams can be scored.";
    const teamData = parseJson<Record<string, unknown>>(teamRow.data_json, {});
    if (teamData.track !== data.track) return "The selected track does not match the team.";
    if (user.role === "judge" && !user.trackIds.includes(String(data.track))) return "This judge is not assigned to that track.";
    const controls = await query("SELECT value_json FROM settings WHERE key='live_control'");
    const live = parseJson<{ lockedTracks?: string[] }>((controls.rows[0] as Record<string, unknown> | undefined)?.value_json, {});
    if (live.lockedTracks?.includes(String(data.track))) return "Scoring is locked for this track.";
    const rubricResult = await query("SELECT value_json FROM settings WHERE key='scoring_criteria'");
    const rubric = parseJson<Array<{ key: string; weight: number }>>((rubricResult.rows[0] as Record<string, unknown> | undefined)?.value_json, []);
    if (rubric.length) data.total = Math.round(rubric.reduce((sum, item) => sum + Number((data.scores as Record<string, number>)[item.key] || 0) * (Number(item.weight) || 0), 0) * 100) / 10000;
    data.team_name = teamData.team_name;
    const same = await query("SELECT id FROM records WHERE section='scoring' AND json_extract(data_json,'$.team_id')=? AND json_extract(data_json,'$.judge_id')=? AND id<>COALESCE(?, '') LIMIT 1", [String(data.team_id), String(data.judge_id||user.id), ignoreId || ""]);
    if (same.rows.length) return "You have already scored this team. Edit your existing sheet instead.";
  }
  return null;
}

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const section = request.nextUrl.searchParams.get("section") || "";
  if (!PORTAL_SECTIONS.includes(section)) return NextResponse.json({ error: "Unknown section." }, { status: 400 });
  const result = user.role === "master"
    ? await execute("SELECT r.*,u.name AS creator_name,u.department_id AS creator_department FROM records r LEFT JOIN users u ON u.id=r.created_by WHERE r.section=? ORDER BY r.created_at DESC", [section])
    : await execute("SELECT r.*,u.name AS creator_name,u.department_id AS creator_department FROM records r LEFT JOIN users u ON u.id=r.created_by WHERE r.section=? AND (r.status='approved' OR r.created_by=?) ORDER BY r.created_at DESC", [section, user.id]);
  return NextResponse.json({ records: result.rows.map(row => recordFromRow(row as Record<string, unknown>)) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const section = typeof body.section === "string" ? body.section : "";
  if (!PORTAL_SECTIONS.includes(section) || !canManageSection(user, section)) return NextResponse.json({ error: "You cannot add entries in this section." }, { status: 403 });
  const data = validate(section, body.data, user);
  if (!data) return NextResponse.json({ error: "Check the required fields and try again." }, { status: 400 });
  const special = await verifySpecialRecord(section, data, user);
  if (special) return NextResponse.json({ error: special }, { status: 409 });
  const id = randomUUID(); const at = new Date().toISOString(); const status = user.role === "master" ? "approved" : "pending";
  try {
    await transaction(async tx => {
      await tx.execute({ sql: "INSERT INTO records(id,section,data_json,status,created_by,created_at,updated_at,version) VALUES(?,?,?,?,?,?,?,1)", args: [id, section, JSON.stringify(data), status, user.id, at, at] });
      await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), user.id, "created", section, id, JSON.stringify({ data, status }), at] });
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && String((error as { code?: unknown }).code).includes("UNIQUE")) return NextResponse.json({ error: "That team code or judge/team score already exists." }, { status: 409 });
    return NextResponse.json({ error: "Could not save this entry." }, { status: 500 });
  }
  return NextResponse.json({ id, status }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const action = typeof body.action === "string" ? body.action : "edit";
  const ids = Array.isArray(body.ids) ? body.ids.filter((id): id is string => typeof id === "string").slice(0, 100) : typeof body.id === "string" ? [body.id] : [];
  if (!ids.length) return NextResponse.json({ error: "Choose at least one entry." }, { status: 400 });
  if (["approve", "reject"].includes(action) && user.role !== "master") return NextResponse.json({ error: "Only a Master can review submissions." }, { status: 403 });
  if (!["approve", "reject", "edit"].includes(action)) return NextResponse.json({ error: "Unsupported action." }, { status: 400 });
  const reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 1000) : "";
  if (action === "reject" && !reason) return NextResponse.json({ error: "Add a reason so the submitter knows what to revise." }, { status: 400 });
  const at = new Date().toISOString();
  try {
    await transaction(async tx => {
      for (const id of ids) {
        const found = await tx.execute({ sql: "SELECT * FROM records WHERE id=?", args: [id] });
        const row = found.rows[0] as Record<string, unknown> | undefined;
        if (!row) throw new Error("ENTRY_NOT_FOUND");
        const section = String(row.section);
        if (!PORTAL_SECTIONS.includes(section)) throw new Error("INVALID_SECTION");
        const own = String(row.created_by) === user.id;
        const master = user.role === "master";
        if (!master && (!own || !canManageSection(user, section) || !["pending", "rejected"].includes(String(row.status)))) throw new Error("ENTRY_FORBIDDEN");
        const oldData = parseJson<Record<string, unknown>>(row.data_json, {});
        let newData = oldData;
        let status = String(row.status);
        let rejectReason = row.reject_reason ? String(row.reject_reason) : null;
        let reviewedBy = row.reviewed_by ? String(row.reviewed_by) : null;
        let reviewedAt = row.reviewed_at ? String(row.reviewed_at) : null;
        let event = "edited";
        if (action === "approve" || action === "reject") {
          if (!master) throw new Error("ENTRY_FORBIDDEN");
          if (body.data && typeof body.data === "object") {
            const validated = validate(section, body.data, user);
            if (!validated) throw new Error("INVALID_ENTRY");
            const special = await verifySpecialRecord(section, validated, user, id, tx);
            if (special) throw new Error("SPECIAL_VALIDATION");
            newData = validated;
          } else if (action === "approve") {
            const special = await verifySpecialRecord(section, oldData, user, id, tx);
            if (special) throw new Error("SPECIAL_VALIDATION");
          }
          status = action === "approve" ? "approved" : "rejected";
          rejectReason = action === "reject" ? reason : null;
          reviewedBy = user.id; reviewedAt = at; event = action === "approve" ? "approved" : "rejected";
        } else {
          const masterEditing = master;
          if (!masterEditing && (!["pending", "rejected"].includes(String(row.status)) || !own)) throw new Error("ENTRY_FORBIDDEN");
          const validated = validate(section, body.data, user);
          if (!validated) throw new Error("INVALID_ENTRY");
          const special = await verifySpecialRecord(section, validated, user, id, tx);
          if (special) throw new Error("SPECIAL_VALIDATION");
          newData = validated;
          if (!master) { status = "pending"; rejectReason = null; reviewedBy = null; reviewedAt = null; event = "resubmitted"; }
        }
        const expectedVersion = Number((body.expectedVersions as Record<string, unknown> | undefined)?.[id] ?? body.expectedVersion ?? row.version);
        if (action === "edit" && expectedVersion !== Number(row.version)) throw new Error("STALE_ENTRY");
        const changed = await tx.execute({ sql: "UPDATE records SET data_json=?,status=?,updated_at=?,reviewed_by=?,reviewed_at=?,reject_reason=?,version=version+1 WHERE id=? AND version=?", args: [JSON.stringify(newData), status, at, reviewedBy, reviewedAt, rejectReason, id, Number(row.version)] });
        if (changed.rowsAffected !== 1) throw new Error("STALE_ENTRY");
        await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,old_json,new_json,created_at) VALUES(?,?,?,?,?,?,?,?)", args: [randomUUID(), user.id, event, section, id, JSON.stringify({ data: oldData, status: row.status, rejectReason: row.reject_reason }), JSON.stringify({ data: newData, status, rejectReason }), at] });
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "ENTRY_NOT_FOUND") return NextResponse.json({ error: "An entry was not found; refresh the list." }, { status: 404 });
    if (message === "ENTRY_FORBIDDEN") return NextResponse.json({ error: "You cannot edit or review this entry." }, { status: 403 });
    if (message === "INVALID_ENTRY") return NextResponse.json({ error: "Check the entry fields and try again." }, { status: 400 });
    if (message === "SPECIAL_VALIDATION") return NextResponse.json({ error: "This team code, scoring assignment, or track state is no longer valid." }, { status: 409 });
    if (message === "STALE_ENTRY") return NextResponse.json({ error: "Someone changed this entry while you were editing it. Refresh and review the latest version." }, { status: 409 });
    return NextResponse.json({ error: "Could not update the entries." }, { status: 500 });
  }
  return NextResponse.json({ ok: true, count: ids.length });
}

export async function DELETE(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const id = typeof body.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Choose an entry." }, { status: 400 });
  const found = await execute("SELECT * FROM records WHERE id=?", [id]);
  const row = found.rows[0] as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  const section = String(row.section); const own = String(row.created_by) === user.id;
  if (user.role !== "master" && (!own || !canManageSection(user, section) || !["pending", "rejected"].includes(String(row.status)))) return NextResponse.json({ error: "You cannot delete this entry." }, { status: 403 });
  const at = new Date().toISOString();
  await transaction(async tx => {
    await tx.execute({ sql: "DELETE FROM records WHERE id=?", args: [id] });
    await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,old_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), user.id, "deleted", section, id, JSON.stringify({ data_json: row.data_json, status: row.status }), at] });
  });
  return NextResponse.json({ ok: true });
}
