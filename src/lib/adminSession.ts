import { createHmac, randomBytes } from "node:crypto";

export const SESSION_COOKIE = "eureka_committee_session";
export const SESSION_SECONDS = 7 * 24 * 60 * 60;

function sessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error("SESSION_SECRET must contain at least 32 characters.");
  return secret;
}

export function newSessionToken() { return randomBytes(32).toString("base64url"); }
export function sessionTokenHash(token: string) { return createHmac("sha256", sessionSecret()).update(token).digest("hex"); }