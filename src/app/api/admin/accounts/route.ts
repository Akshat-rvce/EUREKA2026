import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminServer";
import { ROLE_DEFAULTS, type AdminRole, type PermissionSet } from "@/lib/adminAccess";

export async function GET() {
  const owner = await requireAdmin("accountsManage");
  if (!owner || owner.role !== "owner") return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  const snap = await adminDb().collection("adminUsers").get();
  return NextResponse.json({ users: snap.docs.map(doc => ({ uid: doc.id, ...doc.data() })) });
}

export async function POST(request: NextRequest) {
  const owner = await requireAdmin("accountsManage");
  if (!owner || owner.role !== "owner") return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const name = String(body.name || "").trim();
    const password = String(body.password || "");
    const role = body.role as AdminRole;
    if (!email || !name || password.length < 12 || (role !== "custom" && !(role in ROLE_DEFAULTS))) return NextResponse.json({ error: "Enter a name, valid email, role, and a password of at least 12 characters." }, { status: 400 });
    const permissions: PermissionSet = role === "custom" ? body.permissions : ROLE_DEFAULTS[role as Exclude<AdminRole, "owner" | "custom">];
    if (!permissions || permissions.accountsManage || permissions.settingsManage) return NextResponse.json({ error: "Only the owner can manage accounts and security settings." }, { status: 400 });
    const created = await adminAuth().createUser({ email, password, displayName: name, emailVerified: false });
    await adminDb().collection("adminUsers").doc(created.uid).set({ email, name, role, active: true, mustChangePassword: true, trackIds: Array.isArray(body.trackIds) ? body.trackIds : [], permissions, createdAt: new Date().toISOString(), createdBy: owner.uid });
    await adminDb().collection("adminAudit").add({ actorUid: owner.uid, action: "account-created", targetUid: created.uid, email, role, at: new Date().toISOString() });
    return NextResponse.json({ uid: created.uid });
  } catch {
    return NextResponse.json({ error: "Account could not be created. Check for duplicate email and Firebase server configuration." }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const owner = await requireAdmin("accountsManage");
  if (!owner || owner.role !== "owner") return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  const { uid, active, role, permissions, trackIds } = await request.json();
  if (!uid || uid === owner.uid) return NextResponse.json({ error: "Your owner account cannot be disabled here." }, { status: 400 });
  const profileRef = adminDb().collection("adminUsers").doc(String(uid));
  const profile = await profileRef.get();
  if (!profile.exists || profile.data()?.role === "owner") return NextResponse.json({ error: "Owner accounts cannot be modified here." }, { status: 403 });
  const update: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (typeof active === "boolean") {
    update.active = active;
    await adminAuth().updateUser(String(uid), { disabled: !active });
  }
  if (role !== undefined) {
    if (role !== "custom" && !(role in ROLE_DEFAULTS)) return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    const nextPermissions = role === "custom" ? permissions : ROLE_DEFAULTS[role as Exclude<AdminRole, "owner" | "custom">];
    if (!nextPermissions || nextPermissions.accountsManage || nextPermissions.settingsManage) return NextResponse.json({ error: "Only the owner can manage accounts and security settings." }, { status: 400 });
    update.role = role;
    update.permissions = nextPermissions;
  }
  if (Array.isArray(trackIds)) update.trackIds = trackIds.filter((id: unknown) => typeof id === "string");
  await profileRef.update(update);
  await adminDb().collection("adminAudit").add({ actorUid: owner.uid, action: typeof active === "boolean" ? (active ? "account-enabled" : "account-disabled") : "account-access-updated", targetUid: uid, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
