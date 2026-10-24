import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminServer";
import { OWNER_PERMISSIONS, ROLE_DEFAULTS, type AdminRole, type PermissionSet } from "@/lib/adminAccess";
import { TRACKS } from "@/config/site";
import { invitationEmailConfigured, passwordSetupContinueUrl, sendPasswordSetupInvitation } from "@/lib/invitationEmail";

const roles = new Set<AdminRole>(["administrator", "organizer", "judge", "checkin", "viewer", "custom"]);
const permissionKeys: Array<keyof PermissionSet> = ["dashboard", "registrationsRead", "registrationsWrite", "checkinRead", "checkinWrite", "judgingRead", "judgingWrite", "leaderboardRead", "accountsManage", "settingsManage"];
const validTrackIds = new Set(TRACKS.map(track => track.id));
const isOwner = (user: Awaited<ReturnType<typeof requireAdmin>>): user is NonNullable<Awaited<ReturnType<typeof requireAdmin>>> => Boolean(user && user.role === "owner");
const singleLoginMode = () => Boolean(process.env.EUREKA_ADMIN_PASSWORD);
const singleLoginResponse = () => NextResponse.json({ error: "Individual accounts are unavailable while this portal uses one shared owner login." }, { status: 409 });
const normalizeTracks = (value: unknown): string[] | null => {
  if (!Array.isArray(value) || value.some(id => typeof id !== "string" || !validTrackIds.has(id))) return null;
  return [...new Set(value)];
};
function resolveAssignment(role: unknown, input: unknown): { role: AdminRole; permissions: PermissionSet } | null {
  if (typeof role !== "string" || !roles.has(role as AdminRole)) return null;
  const typedRole = role as AdminRole;
  if (typedRole !== "custom") return { role: typedRole, permissions: ROLE_DEFAULTS[typedRole as Exclude<AdminRole, "owner" | "custom">] };
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const supplied = input as Record<string, unknown>;
  if (Object.keys(supplied).some(key => !permissionKeys.includes(key as keyof PermissionSet))) return null;
  const permissions = {} as PermissionSet;
  for (const key of permissionKeys) permissions[key] = supplied[key] === true;
  if (permissions.accountsManage || permissions.settingsManage) return null;
  return { role: typedRole, permissions };
}

export async function GET() {
  if (singleLoginMode()) return singleLoginResponse();
  const owner = await requireAdmin("accountsManage");
  if (!isOwner(owner)) return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  const snap = await adminDb().collection("adminUsers").get();
  const users: Array<Record<string, unknown> & { uid: string }> = snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  if (!users.some(person => person.uid === owner.uid)) users.unshift({ uid: owner.uid, email: owner.email, name: owner.name, role: "owner", active: true, invitationStatus: "owner", trackIds: [], permissions: OWNER_PERMISSIONS });
  return NextResponse.json({ users }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (singleLoginMode()) return singleLoginResponse();
  const owner = await requireAdmin("accountsManage");
  if (!isOwner(owner)) return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  if (!invitationEmailConfigured()) return NextResponse.json({ error: "Invitation email is not configured. Add RESEND_API_KEY, RESEND_FROM_EMAIL, and APP_BASE_URL first. No account was created." }, { status: 503 });
  try { passwordSetupContinueUrl(); } catch { return NextResponse.json({ error: "APP_BASE_URL must be a valid HTTPS origin for production. No account was created." }, { status: 503 }); }
  try {
    const body = await request.json();
    if (body.action === "resend" || body.action === "restore") return await sendExistingInvitation(owner, body.uid, body.action);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || name.length < 2 || name.length > 100 || /[\u0000-\u001f\u007f]/.test(name)) {
      return NextResponse.json({ error: "Enter a valid email address and a name between 2 and 100 characters." }, { status: 400 });
    }
    if (email === process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase()) return NextResponse.json({ error: "The configured owner already has permanent access." }, { status: 409 });
    const assignment = resolveAssignment(body.role, body.permissions);
    const tracks = normalizeTracks(body.trackIds);
    if (!assignment || !tracks) return NextResponse.json({ error: "Choose a valid non-owner role, allowed permissions, and valid track assignments." }, { status: 400 });
    try {
      await adminAuth().getUserByEmail(email);
      return NextResponse.json({ error: "An account already exists for that email. Ask the owner to manage the existing account." }, { status: 409 });
    } catch (error) {
      if ((error as { code?: string })?.code !== "auth/user-not-found") throw error;
    }
    // A stable, opaque profile/Auth uid prevents concurrent Owner submissions
    // for the same normalized email from creating duplicate invitation rows.
    const uid = `eureka_${createHash("sha256").update(email).digest("hex")}`;
    const profileRef = adminDb().collection("adminUsers").doc(uid);
    const now = new Date().toISOString();
    const batch = adminDb().batch();
    batch.create(profileRef, { email, name, role: assignment.role, active: false, invitationStatus: "provisioning", mustChangePassword: false, assignedTrack: tracks.length === 1 ? tracks[0] : "", trackIds: tracks, permissions: assignment.permissions, createdAt: now, createdBy: owner.uid, updatedAt: now });
    batch.create(adminDb().collection("adminAudit").doc(), { actorUid: owner.uid, actorEmail: owner.email, action: "account-invitation-created", targetUid: uid, email, role: assignment.role, trackIds: tracks, at: now });
    try { await batch.commit(); }
    catch (error) {
      if ((error as { code?: number })?.code === 6 || (error as { code?: string })?.code === "already-exists") {
        return NextResponse.json({ error: "An EUREKA invitation already exists for this email. Refresh User Management to manage or resend it." }, { status: 409 });
      }
      throw error;
    }
    try {
      await adminAuth().createUser({ uid, email, displayName: name, emailVerified: false });
    } catch {
      const failedAt = new Date().toISOString();
      await profileRef.update({ invitationStatus: "delivery_failed", updatedAt: failedAt }).catch(() => {});
      await adminDb().collection("adminAudit").add({ actorUid: owner.uid, actorEmail: owner.email, action: "account-provisioning-failed", targetUid: uid, email, at: failedAt }).catch(() => {});
      return NextResponse.json({ error: "The EUREKA invitation is saved but Firebase could not provision the account. Retry the invitation after checking Firebase Admin access." }, { status: 503 });
    }
    try {
      const link = await adminAuth().generatePasswordResetLink(email, { url: passwordSetupContinueUrl() });
      await sendPasswordSetupInvitation(email, name, link);
      await adminAuth().updateUser(uid, { disabled: false });
      const sentAt = new Date().toISOString();
      const completion = adminDb().batch();
      completion.update(profileRef, { active: true, invitationStatus: "invited", lastInvitationSentAt: sentAt, updatedAt: sentAt });
      completion.create(adminDb().collection("adminAudit").doc(), { actorUid: owner.uid, actorEmail: owner.email, action: "account-invitation-sent", targetUid: uid, email, at: sentAt });
      await completion.commit();
      return NextResponse.json({ uid, invitationSent: true }, { status: 201 });
    } catch {
      await adminAuth().updateUser(uid, { disabled: true }).catch(() => {});
      await profileRef.update({ active: false, invitationStatus: "delivery_failed", updatedAt: new Date().toISOString() }).catch(() => {});
      await adminDb().collection("adminAudit").add({ actorUid: owner.uid, actorEmail: owner.email, action: "account-invitation-delivery-failed", targetUid: uid, email, at: new Date().toISOString() }).catch(() => {});
      return NextResponse.json({ error: "The account was created but remains disabled because the invitation could not be delivered. Configure the sender and retry the invitation." }, { status: 502 });
    }
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code === "auth/email-already-exists") return NextResponse.json({ error: "An account already exists for that email." }, { status: 409 });
    return NextResponse.json({ error: "Invitation could not be created. Check Firebase Admin and email-provider configuration." }, { status: 503 });
  }
}

async function sendExistingInvitation(owner: NonNullable<Awaited<ReturnType<typeof requireAdmin>>>, uidValue: unknown, action: "resend" | "restore") {
  const uid = typeof uidValue === "string" ? uidValue : "";
  if (!uid || uid === owner.uid) return NextResponse.json({ error: "Invalid account." }, { status: 400 });
  const profileRef = adminDb().collection("adminUsers").doc(uid);
  const profileSnap = await profileRef.get();
  if (!profileSnap.exists || profileSnap.data()?.role === "owner") return NextResponse.json({ error: "Owner or missing accounts cannot be reinvited." }, { status: 403 });
  const profile = profileSnap.data()!;
  let authUser;
  try { authUser = await adminAuth().getUser(uid); }
  catch (error) {
    if ((error as { code?: string })?.code !== "auth/user-not-found" || !["delivery_failed", "provisioning"].includes(profile.invitationStatus)) throw error;
    try { await adminAuth().getUserByEmail(String(profile.email)); return NextResponse.json({ error: "A Firebase account already exists for this email but does not match this invitation. No account was changed." }, { status: 409 }); }
    catch (lookupError) { if ((lookupError as { code?: string })?.code !== "auth/user-not-found") throw lookupError; }
    authUser = await adminAuth().createUser({ uid, email: String(profile.email), displayName: String(profile.name), emailVerified: false });
  }
  if (authUser.email?.toLowerCase() === process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase()) return NextResponse.json({ error: "The permanent owner account cannot be reinvited here." }, { status: 403 });
  const revoked = profile.invitationStatus === "revoked";
  if (revoked !== (action === "restore")) return NextResponse.json({ error: revoked ? "Restoring revoked access requires an explicit restore invitation." : "This account does not require a restore invitation." }, { status: 409 });
  if (action === "resend" && profile.invitationStatus === "disabled") return NextResponse.json({ error: "Re-enable this account before sending a password reset invitation." }, { status: 409 });
  const shouldDisableOnFailure = action === "restore" || profile.active !== true;
  try {
    // Firebase may reject reset-link generation for a disabled account. Enable
    // Auth only while its Firestore profile still blocks every admin session.
    if (authUser.disabled) await adminAuth().updateUser(uid, { disabled: false });
    const link = await adminAuth().generatePasswordResetLink(String(profile.email), { url: passwordSetupContinueUrl() });
    await sendPasswordSetupInvitation(String(profile.email), String(profile.name), link);
  } catch {
    if (shouldDisableOnFailure) await adminAuth().updateUser(uid, { disabled: true }).catch(() => {});
    return NextResponse.json({ error: "The email provider did not accept the invitation. Access state is unchanged." }, { status: 502 });
  }
  const now = new Date().toISOString();
  try {
    await adminDb().runTransaction(async transaction => {
      const current = await transaction.get(profileRef);
      if (!current.exists || (current.data()?.updatedAt ?? null) !== (profile.updatedAt ?? null)) throw new Error("ACCOUNT_CONFLICT");
      const wasRevoked = current.data()?.invitationStatus === "revoked";
      if (action === "restore" && !wasRevoked) throw new Error("ACCOUNT_CONFLICT");
      const active = action === "restore" || ["delivery_failed", "provisioning"].includes(String(current.data()?.invitationStatus)) ? true : current.data()?.active === true;
      transaction.update(profileRef, { active, invitationStatus: active ? (current.data()?.invitationStatus === "accepted" ? "accepted" : "invited") : current.data()?.invitationStatus, lastInvitationSentAt: now, updatedAt: now });
      transaction.create(adminDb().collection("adminAudit").doc(), { actorUid: owner.uid, actorEmail: owner.email, action: action === "restore" ? "account-restored-and-invited" : "account-invitation-resent", targetUid: uid, email: profile.email, at: now });
    });
  } catch (error) {
    if (shouldDisableOnFailure) await adminAuth().updateUser(uid, { disabled: true }).catch(() => {});
    throw error;
  }
  return NextResponse.json({ uid, invitationSent: true });
}

export async function PATCH(request: NextRequest) {
  if (singleLoginMode()) return singleLoginResponse();
  const owner = await requireAdmin("accountsManage");
  if (!isOwner(owner)) return NextResponse.json({ error: "Only the owner can manage accounts." }, { status: 403 });
  try {
    const body = await request.json();
    const uid = typeof body.uid === "string" ? body.uid : "";
    if (!uid || uid === owner.uid) return NextResponse.json({ error: "The permanent owner account cannot be changed here." }, { status: 400 });
    const profileRef = adminDb().collection("adminUsers").doc(uid);
    const authUser = await adminAuth().getUser(uid);
    if (authUser.email?.toLowerCase() === process.env.FIREBASE_OWNER_EMAIL?.trim().toLowerCase()) return NextResponse.json({ error: "The configured owner account cannot be changed here." }, { status: 403 });
    const before = await profileRef.get();
    if (!before.exists || before.data()?.role === "owner") return NextResponse.json({ error: "Owner accounts cannot be modified here." }, { status: 403 });
    const prior = before.data()!;
    const next: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    let action = "account-access-updated";
    if (body.action === "revoke") {
      next.active = false;
      next.invitationStatus = "revoked";
      action = "account-revoked";
    } else if (typeof body.active === "boolean") {
      if (body.active && prior.invitationStatus === "revoked") return NextResponse.json({ error: "Revoked access requires a fresh owner invitation." }, { status: 409 });
      next.active = body.active;
      next.invitationStatus = body.active ? (prior.invitationStatus === "invited" ? "invited" : "active") : "disabled";
      action = body.active ? "account-enabled" : "account-disabled";
    }
    if (body.role !== undefined || body.permissions !== undefined) {
      const assignment = resolveAssignment(body.role ?? prior.role, body.permissions ?? prior.permissions);
      if (!assignment) return NextResponse.json({ error: "Invalid role or permissions. Only the owner role may manage accounts or security settings." }, { status: 400 });
      next.role = assignment.role;
      next.permissions = assignment.permissions;
    }
    if (body.trackIds !== undefined) {
      const tracks = normalizeTracks(body.trackIds);
      if (!tracks) return NextResponse.json({ error: "Track assignment contains an unknown track." }, { status: 400 });
      next.trackIds = tracks;
    }
    const now = new Date().toISOString();
    await adminDb().runTransaction(async transaction => {
      const current = await transaction.get(profileRef);
      if (!current.exists || current.data()?.role === "owner") throw new Error("ACCOUNT_NOT_EDITABLE");
      const currentUpdatedAt = current.data()?.updatedAt ?? null;
      if (body.expectedUpdatedAt !== currentUpdatedAt) throw new Error("ACCOUNT_CONFLICT");
      transaction.update(profileRef, next);
      transaction.create(adminDb().collection("adminAudit").doc(), { actorUid: owner.uid, actorEmail: owner.email, action, targetUid: uid, targetEmail: prior.email, changes: Object.keys(next).filter(key => key !== "updatedAt"), at: now });
    });
    if (typeof body.active === "boolean" || body.action === "revoke") await adminAuth().updateUser(uid, { disabled: body.action === "revoke" || body.active === false });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === "ACCOUNT_CONFLICT") return NextResponse.json({ error: "This user changed elsewhere. Refresh the list and try again." }, { status: 409 });
    if (error instanceof Error && error.message === "ACCOUNT_NOT_EDITABLE") return NextResponse.json({ error: "Owner accounts cannot be modified here." }, { status: 403 });
    return NextResponse.json({ error: "Account could not be updated." }, { status: 503 });
  }
}
