import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { execute, transaction } from "@/lib/database";
import { requireMaster } from "@/lib/adminServer";
import { TRACKS } from "@/config/site";

function originOk(request: NextRequest) { const origin=request.headers.get("origin"); return !origin || origin===request.nextUrl.origin; }

const safe = (row: Record<string, unknown>) => ({ id: String(row.id), name: String(row.name), email: String(row.email), role: String(row.role), departmentId: row.department_id ? String(row.department_id) : null, trackIds: JSON.parse(String(row.track_ids || "[]")), active: Number(row.is_active) === 1, mustChangePassword: Number(row.must_change_password) === 1, createdAt: String(row.created_at), lastSignInAt: row.last_sign_in_at ? String(row.last_sign_in_at) : null });
async function audit(tx: { execute: (arg: { sql: string; args: (string | number | null)[] }) => Promise<unknown> }, actorId: string, action: string, entityId: string, oldValue: unknown, newValue: unknown) {
  return tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,old_json,new_json,created_at) VALUES(?,?,?,?,?,?,?,?)", args: [randomUUID(), actorId, action, "user", entityId, oldValue == null ? null : JSON.stringify(oldValue), newValue == null ? null : JSON.stringify(newValue), new Date().toISOString()] });
}

export async function GET() {
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  const result = await execute("SELECT id,name,email,role,department_id,track_ids,is_active,must_change_password,created_at,last_sign_in_at FROM users ORDER BY created_at DESC");
  return NextResponse.json({ users: result.rows.map(row => safe(row as Record<string, unknown>)) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = body.role;
  const departmentId = typeof body.departmentId === "string" ? body.departmentId.toLowerCase() : "";
  const tempPassword = body.temporaryPassword;
  const trackIds = Array.isArray(body.trackIds) ? body.trackIds.filter((v): v is string => typeof v === "string" && TRACKS.some(track=>track.id===v)).slice(0, 5) : [];
  if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !["master", "member", "judge"].includes(String(role)) || typeof tempPassword !== "string" || tempPassword.length < 12 || tempPassword.length > 128) return NextResponse.json({ error: "Check the name, email, role, and temporary password (at least 12 characters)." }, { status: 400 });
  if ((role === "member" || role === "judge") && !["finance", "registration", "scoring", "logistics", "promotion", "operations"].includes(departmentId)) return NextResponse.json({ error: "Choose a valid department." }, { status: 400 });
  try {
    const duplicate = await execute("SELECT id FROM users WHERE email=? COLLATE NOCASE LIMIT 1", [email]);
    if (duplicate.rows.length) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    if (role === "master") {
      const masters = await execute("SELECT COUNT(*) AS count FROM users WHERE role='master' AND is_active=1");
      if (Number((masters.rows[0] as Record<string, unknown>)?.count || 0) >= 2) return NextResponse.json({ error: "The portal supports at most two active Masters." }, { status: 409 });
    }
    const id = randomUUID(); const at = new Date().toISOString(); const passwordHash = await bcrypt.hash(tempPassword, 12);
    await transaction(async tx => {
      await tx.execute({ sql: "INSERT INTO users(id,name,email,password_hash,role,department_id,track_ids,is_active,must_change_password,created_at) VALUES(?,?,?,?,?,?,?,?,?,?)", args: [id, name, email, passwordHash, String(role), departmentId || null, JSON.stringify(trackIds), 1, 1, at] });
      await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), master.id, "user-created", "user", id, JSON.stringify({ name, email, role, departmentId, trackIds }), at] });
    });
    return NextResponse.json({ user: { id, name, email, role, departmentId: departmentId || null, trackIds, active: true, mustChangePassword: true } }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && String((error as { code?: unknown }).code).includes("UNIQUE")) return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    return NextResponse.json({ error: "Could not create the account." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const id = typeof body.id === "string" ? body.id : ""; const action = body.action;
  if (!id || typeof action !== "string") return NextResponse.json({ error: "Choose a user and action." }, { status: 400 });
  if (id === master.id && ["disable", "reset-password", "role", "department", "tracks"].includes(action)) return NextResponse.json({ error: "Use the password page for your own account; you cannot disable or demote your active Master session." }, { status: 400 });
  const found = await execute("SELECT id,name,email,role,department_id,track_ids,is_active,must_change_password,created_at,last_sign_in_at FROM users WHERE id=?", [id]);
  const row = found.rows[0] as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "User not found." }, { status: 404 });
  const oldValue = safe(row); const at = new Date().toISOString();
  let sql = ""; let args: (string | number | null)[] = []; let actionName = ""; let next: unknown = null;
  if (action === "enable" || action === "disable") {
    if (action === "disable" && row.role === "master") {
      const count = await execute("SELECT COUNT(*) AS count FROM users WHERE role='master' AND is_active=1");
      if (Number((count.rows[0] as Record<string, unknown>)?.count || 0) <= 1) return NextResponse.json({ error: "The last active Master cannot be disabled." }, { status: 409 });
    }
    const active = action === "enable" ? 1 : 0; sql = "UPDATE users SET is_active=? WHERE id=?"; args = [active, id]; actionName = action === "enable" ? "user-enabled" : "user-disabled"; next = { active: Boolean(active) };
  } else if (action === "reset-password") {
    const temp = body.temporaryPassword;
    if (typeof temp !== "string" || temp.length < 12 || temp.length > 128) return NextResponse.json({ error: "Enter a temporary password of at least 12 characters." }, { status: 400 });
    const hash = await bcrypt.hash(temp, 12); sql = "UPDATE users SET password_hash=?,must_change_password=1 WHERE id=?"; args = [hash, id]; actionName = "user-password-reset"; next = { mustChangePassword: true };
  } else if (action === "tracks") {
    const tracks = Array.isArray(body.trackIds) ? body.trackIds.filter((v): v is string => typeof v === "string" && TRACKS.some(track=>track.id===v)).slice(0,5) : null;
    if (!tracks) return NextResponse.json({ error: "Choose valid track assignments." }, { status: 400 });
    sql = "UPDATE users SET track_ids=? WHERE id=?"; args = [JSON.stringify(tracks), id]; actionName = "user-tracks-changed"; next = { trackIds: tracks };
  } else if (action === "role" || action === "department") {
    const role = action === "role" ? body.role : row.role;
    const departmentId = action === "department" ? body.departmentId : body.departmentId ?? row.department_id;
    const dept = typeof departmentId === "string" ? departmentId.toLowerCase() : "";
    if (!["master", "member", "judge"].includes(String(role)) || (role !== "master" && !["finance", "registration", "scoring", "logistics", "promotion", "operations"].includes(dept))) return NextResponse.json({ error: "Choose a valid role and department." }, { status: 400 });
    if (role === "master" && row.role !== "master") {
      const count = await execute("SELECT COUNT(*) AS count FROM users WHERE role='master' AND is_active=1");
      if (Number((count.rows[0] as Record<string, unknown>)?.count || 0) >= 2) return NextResponse.json({ error: "The portal supports at most two active Masters." }, { status: 409 });
    }
    sql = "UPDATE users SET role=?,department_id=? WHERE id=?"; args = [String(role), role === "master" ? null : dept, id]; actionName = action === "role" ? "user-role-changed" : "user-department-changed"; next = { role, departmentId: role === "master" ? null : dept };
  } else return NextResponse.json({ error: "Unsupported user action." }, { status: 400 });
  await transaction(async tx => {
    await tx.execute({ sql, args });
    if (action === "disable") await tx.execute({ sql: "DELETE FROM sessions WHERE user_id=?", args: [id] });
    await audit(tx, master.id, actionName, id, oldValue, next);
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  if (!originOk(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const id = typeof body.id === "string" ? body.id : "";
  if (!id || id === master.id) return NextResponse.json({ error: "The current Master cannot be revoked here." }, { status: 400 });
  const found = await execute("SELECT id,name,email,role,department_id FROM users WHERE id=?", [id]); const row = found.rows[0] as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "User not found." }, { status: 404 });
  await transaction(async tx => {
    await tx.execute({ sql: "DELETE FROM sessions WHERE user_id=?", args: [id] });
    await tx.execute({ sql: "UPDATE users SET is_active=0 WHERE id=?", args: [id] });
    await audit(tx, master.id, "user-access-revoked", id, row, { active: false });
  });
  return NextResponse.json({ ok: true });
}
