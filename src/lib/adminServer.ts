import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, ownerUid, verifyAdminSession } from "@/lib/adminSession";
import { hasPermission, OWNER_PERMISSIONS, type AdminProfile, type Permission } from "@/lib/adminAccess";

export async function currentAdmin(): Promise<AdminProfile | null> {
  try {
    const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
    if (!token) return null;
    const ownerEmail = process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase();
    const session = verifyAdminSession(token);
    if (!ownerEmail || !session || session.email !== ownerEmail) return null;
    const uid = ownerUid(ownerEmail);
    return {
      uid,
      email: ownerEmail,
      name: "EUREKA Owner",
      role: "owner",
      active: true,
      mustChangePassword: false,
      assignedTrack: "",
      trackIds: [],
      permissions: OWNER_PERMISSIONS,
    };
  } catch { return null; }
}

export async function requireAdmin(permission?: Permission) {
  const user = await currentAdmin();
  if (!user || (permission && !hasPermission(user, permission))) return null;
  return user;
}
