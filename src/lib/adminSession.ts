import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "eureka_admin_session";
export const ADMIN_SESSION_SECONDS = 8 * 60 * 60;

type AdminSession = { email: string; uid: string; issuedAt: number; expiresAt: number };

function sessionSecret() {
  const secret = process.env.EUREKA_ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("EUREKA_ADMIN_SESSION_SECRET is not configured securely.");
  return secret;
}

export function ownerUid(email: string) {
  return `owner_${createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 24)}`;
}

export function createAdminSession(email: string) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSession = { email: email.trim().toLowerCase(), uid: ownerUid(email), issuedAt: now, expiresAt: now + ADMIN_SESSION_SECONDS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", sessionSecret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifyAdminSession(token: string): AdminSession | null {
  try {
    const [encoded, suppliedSignature, extra] = token.split(".");
    if (!encoded || !suppliedSignature || extra) return null;
    const expectedSignature = createHmac("sha256", sessionSecret()).update(encoded).digest();
    const actualSignature = Buffer.from(suppliedSignature, "base64url");
    if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature)) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSession;
    const now = Math.floor(Date.now() / 1000);
    const ownerEmail = process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase();
    if (!ownerEmail || payload.email !== ownerEmail || payload.uid !== ownerUid(ownerEmail) || !Number.isInteger(payload.issuedAt) || !Number.isInteger(payload.expiresAt) || payload.issuedAt > now + 60 || payload.expiresAt <= now || payload.expiresAt - payload.issuedAt > ADMIN_SESSION_SECONDS) return null;
    return payload;
  } catch {
    return null;
  }
}
