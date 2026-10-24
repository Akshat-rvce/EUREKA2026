import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_SECONDS, createAdminSession, ownerUid } from "@/lib/adminSession";

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function logDatabaseFailure(stage: "login-attempt" | "session-audit", error: unknown) {
  const value = error && typeof error === "object" ? error as { name?: unknown; code?: unknown } : {};
  const code = typeof value.code === "string" || typeof value.code === "number" ? String(value.code).slice(0, 80) : undefined;
  const name = typeof value.name === "string" ? value.name.slice(0, 80) : "UnknownError";
  // Keep diagnostics useful without logging credentials, service-account data,
  // request bodies, email addresses, or raw provider error messages.
  console.error("[admin-auth] Firestore access failed", { stage, name, ...(code ? { code } : {}) });
}

function loginAttemptRef(request: NextRequest) {
  const ip = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  return adminDb().collection("adminLoginAttempts").doc(key);
}

async function takeLoginAttempt(request: NextRequest) {
  const ref = loginAttemptRef(request);
  return adminDb().runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    const now = Date.now();
    const existing = snapshot.data();
    if (typeof existing?.blockedUntil === "number" && existing.blockedUntil > now) return false;
    const withinWindow = typeof existing?.windowStartedAt === "number" && now - existing.windowStartedAt < ATTEMPT_WINDOW_MS;
    const windowStartedAt = withinWindow ? existing.windowStartedAt : now;
    const attempts = (withinWindow && typeof existing?.attempts === "number" ? existing.attempts : 0) + 1;
    transaction.set(ref, { windowStartedAt, attempts, blockedUntil: attempts >= MAX_ATTEMPTS ? now + ATTEMPT_WINDOW_MS : 0, expiresAt: new Date(now + 24 * 60 * 60 * 1000).toISOString() });
    return attempts <= MAX_ATTEMPTS;
  });
}

export async function POST(request: NextRequest) {
  const allowedOrigin = request.nextUrl.origin;
  const origin = request.headers.get("origin");
  if (origin && origin !== allowedOrigin) return NextResponse.json({ error: "Sign-in request rejected." }, { status: 403 });

  const ownerEmail = process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase();
  const configuredPassword = process.env.EUREKA_ADMIN_PASSWORD;
  const sessionSecret = process.env.EUREKA_ADMIN_SESSION_SECRET;
  if (!ownerEmail || !configuredPassword || !sessionSecret || sessionSecret.length < 32) {
    return NextResponse.json({ error: "Admin sign-in is not configured on this server." }, { status: 503 });
  }

  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Enter the configured email and password." }, { status: 400 }); }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Enter the configured email and password." }, { status: 400 });
  const { email, password } = body as { email?: unknown; password?: unknown };
  if (typeof email !== "string" || typeof password !== "string" || email.length > 320 || password.length > 256) {
    return NextResponse.json({ error: "The email or password is incorrect." }, { status: 401 });
  }

  let mayTry: boolean;
  try { mayTry = await takeLoginAttempt(request); }
  catch (error) {
    logDatabaseFailure("login-attempt", error);
    return NextResponse.json({ error: "Shared database access is not configured." }, { status: 503 });
  }
  if (!mayTry) return NextResponse.json({ error: "Too many sign-in attempts. Try again in 15 minutes." }, { status: 429 });

  const expectedEmail = createHash("sha256").update(ownerEmail).digest();
  const suppliedEmail = createHash("sha256").update(email.trim().toLowerCase()).digest();
  const expectedPassword = createHash("sha256").update(configuredPassword).digest();
  const suppliedPassword = createHash("sha256").update(password).digest();
  const emailMatches = timingSafeEqual(expectedEmail, suppliedEmail);
  const passwordMatches = timingSafeEqual(expectedPassword, suppliedPassword);
  const credentialsMatch = emailMatches && passwordMatches;
  if (!credentialsMatch) return NextResponse.json({ error: "The email or password is incorrect." }, { status: 401 });

  try {
    const uid = ownerUid(ownerEmail);
    const now = new Date().toISOString();
    await loginAttemptRef(request).set({ windowStartedAt: Date.now(), attempts: 0, blockedUntil: 0, expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() });
    await adminDb().collection("adminAudit").add({ actorUid: uid, actorEmail: ownerEmail, action: "sign-in", at: now });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(ownerEmail), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: ADMIN_SESSION_SECONDS });
    return response;
  } catch (error) {
    logDatabaseFailure("session-audit", error);
    return NextResponse.json({ error: "Sign-in could not be completed. Check the server configuration." }, { status: 503 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 0 });
  return response;
}
