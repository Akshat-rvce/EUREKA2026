import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { execute, transaction } from "@/lib/database";
import { SESSION_COOKIE, SESSION_SECONDS, newSessionToken, sessionTokenHash } from "@/lib/adminSession";
import { sameOrigin } from "@/lib/origin";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
function attemptKey(email: string, request: NextRequest) {
  const address = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return createHash("sha256").update(`${email.toLowerCase()}|${address}`).digest("hex");
}
export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Sign-in request rejected." }, { status: 403 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Enter your email and password." }, { status: 400 }); }
  const email = body && typeof body === "object" ? (body as Record<string, unknown>).email : null;
  const password = body && typeof body === "object" ? (body as Record<string, unknown>).password : null;
  if (typeof email !== "string" || typeof password !== "string" || email.length > 320 || password.length > 256) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  const normalized = email.trim().toLowerCase();
  const key = attemptKey(normalized, request);
  const now = Date.now();
  try {
    const attempt = await execute(`INSERT INTO login_attempts(attempt_key,window_started_at,attempts,blocked_until) VALUES(?,?,1,0)
      ON CONFLICT(attempt_key) DO UPDATE SET
      attempts=CASE WHEN login_attempts.blocked_until>? THEN login_attempts.attempts WHEN login_attempts.window_started_at<=?-? THEN 1 ELSE login_attempts.attempts+1 END,
      window_started_at=CASE WHEN login_attempts.blocked_until>? THEN login_attempts.window_started_at WHEN login_attempts.window_started_at<=?-? THEN ? ELSE login_attempts.window_started_at END,
      blocked_until=CASE WHEN login_attempts.blocked_until>? THEN login_attempts.blocked_until WHEN login_attempts.window_started_at<=?-? THEN 0 WHEN login_attempts.attempts+1>=? THEN ?+? ELSE 0 END
      RETURNING attempts,blocked_until`, [key, now, now, now, WINDOW_MS, now, now, WINDOW_MS, now, now, now, WINDOW_MS, MAX_ATTEMPTS, now, WINDOW_MS]);
    const row = attempt.rows[0] as Record<string, unknown> | undefined;
    if (!row || Number(row.blocked_until) > now || Number(row.attempts) > MAX_ATTEMPTS) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });

    const result = await execute("SELECT id,name,email,password_hash,role,department_id,track_ids,is_active,must_change_password FROM users WHERE email=? COLLATE NOCASE LIMIT 1", [normalized]);
    const user = result.rows[0] as Record<string, unknown> | undefined;
    const passwordOk = user && Number(user.is_active) === 1 && await bcrypt.compare(password, String(user.password_hash));
    if (!passwordOk || !user) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });

    const token = newSessionToken();
    const tokenHash = sessionTokenHash(token);
    const sessionId = randomUUID();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
    await transaction(async tx => {
      await tx.execute({ sql: "INSERT INTO sessions(id,user_id,token_hash,expires_at,created_at) VALUES(?,?,?,?,?)", args: [sessionId, String(user.id), tokenHash, expiresAt, createdAt] });
      await tx.execute({ sql: "UPDATE users SET last_sign_in_at=? WHERE id=?", args: [createdAt, String(user.id)] });
      await tx.execute({ sql: "DELETE FROM login_attempts WHERE attempt_key=?", args: [key] });
      await tx.execute({ sql: "INSERT INTO audit_log(id,user_id,action,entity,entity_id,new_json,created_at) VALUES(?,?,?,?,?,?,?)", args: [randomUUID(), String(user.id), "sign-in", "session", sessionId, JSON.stringify({ email: normalized }), createdAt] });
    });
    const response = NextResponse.json({ ok: true, mustChangePassword: Number(user.must_change_password) === 1 });
    response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: SESSION_SECONDS });
    return response;
  } catch (error) {
    console.error("[portal-auth] sign-in failed", { name: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Sign-in is temporarily unavailable. Check the database connection." }, { status: 503 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Request rejected." }, { status: 403 });
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) await execute("DELETE FROM sessions WHERE token_hash=?", [sessionTokenHash(token)]).catch(() => undefined);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
