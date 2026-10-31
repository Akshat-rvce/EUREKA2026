import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/adminServer";
import { execute, transaction } from "@/lib/database";
import { randomUUID } from "node:crypto";
import { sameOrigin } from "@/lib/origin";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await context.params;
  const found = await execute("SELECT a.filename,a.mime_type,a.data,a.uploaded_by,r.status,r.created_by FROM attachments a LEFT JOIN records r ON r.section='finance' AND json_extract(r.data_json,'$.attachment_id')=a.id WHERE a.id=? LIMIT 1", [id]);
  const row = found.rows[0] as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ error: "Receipt not found." }, { status: 404 });
  const canSee = user.role === "master" || row.uploaded_by === user.id || row.status === "approved";
  if (!canSee) return NextResponse.json({ error: "You cannot view this receipt." }, { status: 403 });
  return new NextResponse(row.data as BodyInit, { headers: { "Content-Type": String(row.mime_type), "Content-Disposition": `inline; filename="${String(row.filename).replace(/[\r\n"\\]/g, "_")}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const { id } = await context.params;
  const found = await execute("SELECT a.uploaded_by,a.filename,a.mime_type,EXISTS(SELECT 1 FROM records r WHERE r.section='finance' AND json_extract(r.data_json,'$.attachment_id')=a.id AND r.status='approved') AS approved_use FROM attachments a WHERE a.id=?", [id]);
  const row = found.rows[0] as Record<string, unknown> | undefined;
  if (!row) return NextResponse.json({ ok: true });
  if (user.role !== "master" && row.uploaded_by !== user.id) return NextResponse.json({ error: "You cannot delete this receipt." }, { status: 403 });
  if (user.role !== "master" && Number(row.approved_use) === 1) return NextResponse.json({ error: "Only the Master can remove a receipt from an approved transaction." }, { status: 403 });
  await transaction(async tx => {
    await tx.execute({ sql: "DELETE FROM attachments WHERE id=?", args: [id] });
    await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,old_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), user.id, "receipt-deleted", "attachment", id, JSON.stringify({ filename: row.filename, mimeType: row.mime_type }), new Date().toISOString()] });
  });
  return NextResponse.json({ ok: true });
}
