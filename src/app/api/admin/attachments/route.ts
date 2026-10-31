import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/adminServer";
import { execute, transaction } from "@/lib/database";
import { sameOrigin } from "@/lib/origin";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const form = await request.formData(); const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a receipt image." }, { status: 400 });
  const allowed = new Set(["image/jpeg", "image/webp", "image/png"]);
  if (!allowed.has(file.type) || file.size > 2 * 1024 * 1024) return NextResponse.json({ error: "Use a JPG, WebP, or PNG image under 2 MB." }, { status: 400 });
  const bytes = new Uint8Array(await file.arrayBuffer()); const id = randomUUID(); const name = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120) || "receipt";
  const at = new Date().toISOString();
  await transaction(async tx => {
    await tx.execute({ sql: "INSERT INTO attachments(id,filename,mime_type,data,uploaded_by,created_at) VALUES(?,?,?,?,?,?)", args: [id, name, file.type, bytes, user.id, at] });
    await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), user.id, "receipt-uploaded", "attachment", id, JSON.stringify({ filename: name, mimeType: file.type, bytes: file.size }), at] });
  });
  return NextResponse.json({ id }, { status: 201 });
}
