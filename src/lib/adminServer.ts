import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { hasPermission, type AdminProfile, type Permission } from "@/lib/adminAccess";

export async function currentAdmin(): Promise<AdminProfile | null> {
  try {
    const token = (await cookies()).get("eureka_admin_session")?.value;
    if (!token) return null;
    const decoded = await adminAuth().verifySessionCookie(token, true);
    const snap = await adminDb().collection("adminUsers").doc(decoded.uid).get();
    if (!snap.exists || snap.data()?.active === false) return null;
    return { uid: decoded.uid, email: decoded.email || "", ...snap.data() } as AdminProfile;
  } catch { return null; }
}

export async function requireAdmin(permission?: Permission) {
  const user = await currentAdmin();
  if (!user || (permission && !hasPermission(user, permission))) return null;
  return user;
}
