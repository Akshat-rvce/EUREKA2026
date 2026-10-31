import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/adminServer";
import { execute, transaction } from "@/lib/database";
import { SESSION_COOKIE, sessionTokenHash } from "@/lib/adminSession";
import { sameOrigin } from "@/lib/origin";

export async function PATCH(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const user = await currentUser({ allowPasswordChange: true });
  if (!user) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  let input: unknown;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Enter a new password." }, { status: 400 }); }
  const password = input && typeof input === "object" ? (input as Record<string, unknown>).password : null;
  if (typeof password !== "string" || password.length < 12 || password.length > 128) return NextResponse.json({ error: "Use a password between 12 and 128 characters." }, { status: 400 });
  const passwordHash = await bcrypt.hash(password, 12);
  const at = new Date().toISOString();
  await transaction(async tx => {
    await tx.execute({ sql: "UPDATE users SET password_hash=?,must_change_password=0 WHERE id=?", args: [passwordHash, user.id] });
    await tx.execute({ sql: "DELETE FROM sessions WHERE user_id=? AND token_hash<>?", args: [user.id, sessionTokenHash(token)] });
    await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), user.id, "password-changed", "user", user.id, JSON.stringify({ selfService: true }), at] });
  });
  return NextResponse.json({ ok: true });
}
