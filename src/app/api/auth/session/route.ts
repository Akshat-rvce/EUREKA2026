import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();
    if (typeof idToken !== "string") return NextResponse.json({ error: "Missing sign-in token." }, { status: 400 });
    const decoded = await adminAuth().verifyIdToken(idToken, true);
    const ref = adminDb().collection("adminUsers").doc(decoded.uid);
    let profile = await ref.get();
    if (!profile.exists && decoded.email_verified && decoded.email?.toLowerCase() === process.env.FIREBASE_OWNER_EMAIL?.toLowerCase()) {
      await ref.set({ email: decoded.email, name: decoded.name || "EUREKA Owner", role: "owner", active: true, trackIds: [], permissions: {}, createdAt: new Date().toISOString() });
      profile = await ref.get();
    }
    if (!profile.exists || profile.data()?.active === false) return NextResponse.json({ error: "This account has not been provisioned by the owner." }, { status: 403 });
    await ref.set({ lastSignInAt: new Date().toISOString() }, { merge: true });
    await adminDb().collection("adminAudit").add({ actorUid: decoded.uid, actorEmail: decoded.email, action: "sign-in", at: new Date().toISOString() });
    const sessionCookie = await adminAuth().createSessionCookie(idToken, { expiresIn: 5 * 24 * 60 * 60 * 1000 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set("eureka_admin_session", sessionCookie, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 5 * 24 * 60 * 60 });
    return response;
  } catch { return NextResponse.json({ error: "Sign-in could not be verified. Check your credentials and Firebase setup." }, { status: 401 }); }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("eureka_admin_session");
  return response;
}
