import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { execute, transaction } from "@/lib/database";
import { currentUser, requireMaster } from "@/lib/adminServer";
import { sameOrigin } from "@/lib/origin";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const result = await execute("SELECT a.id,a.title,a.body,a.created_at,u.name AS author FROM announcements a JOIN users u ON u.id=a.created_by ORDER BY a.created_at DESC LIMIT 100");
  return NextResponse.json({ announcements: result.rows });
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const master = await requireMaster();
  if (!master) return NextResponse.json({ error: "Master access required." }, { status: 403 });
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid announcement." }, { status: 400 }); }
  const title = typeof body.title === "string" ? body.title.trim() : ""; const message = typeof body.body === "string" ? body.body.trim() : "";
  if (!title || title.length > 160 || !message || message.length > 3000) return NextResponse.json({ error: "Add a title and message (up to 3,000 characters)." }, { status: 400 });
  const id = randomUUID(); const at = new Date().toISOString();
  await transaction(async tx => {
    await tx.execute({ sql: "INSERT INTO announcements(id,title,body,created_by,created_at) VALUES(?,?,?,?,?)", args: [id, title, message, master.id, at] });
    await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), master.id, "announcement-created", "announcement", id, JSON.stringify({ title, body: message }), at] });
  });
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
