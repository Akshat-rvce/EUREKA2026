import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminServer";
import { hasPermission, type Permission } from "@/lib/adminAccess";
import { TRACKS } from "@/config/site";

const collections = ["teams", "scores"] as const;
type Collection = typeof collections[number];
const trackIds = new Set(TRACKS.map(track => track.id));
const canTrack = (user: NonNullable<Awaited<ReturnType<typeof requireAdmin>>>, trackId: unknown) => user.role === "owner" || (typeof trackId === "string" && user.trackIds?.includes(trackId));
const versionOf = (value: Record<string, unknown> | undefined) => typeof value?.version === "number" ? value.version : 0;

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection") as Collection;
  if (!collections.includes(collection)) return NextResponse.json({ error: "Unknown data collection." }, { status: 400 });
  const user = await requireAdmin();
  const mayRead = user && (collection === "teams"
    ? hasPermission(user, "registrationsRead") || hasPermission(user, "checkinRead") || hasPermission(user, "leaderboardRead")
    : hasPermission(user, "judgingRead") || hasPermission(user, "leaderboardRead"));
  if (!user || !mayRead) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  try {
    const snap = await adminDb().collection(collection).get();
    let rows = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (user.role !== "owner") rows = rows.filter((row: Record<string, any>) => user.trackIds?.includes(row.trackId));
    return NextResponse.json({ rows }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "Shared database is not configured." }, { status: 503 }); }
}

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: "Not permitted." }, { status: 403 });
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body) || !body.data || typeof body.data !== "object" || Array.isArray(body.data)) return NextResponse.json({ error: "Missing record." }, { status: 400 });
    const collection = body.collection as Collection;
    if (!collections.includes(collection)) return NextResponse.json({ error: "Unknown data collection." }, { status: 400 });
    const data = body.data as Record<string, unknown>;
    if (collection === "scores") return await saveScore(data, user);
    return await saveTeam(data, user);
  } catch (error) {
    if (error instanceof Error && error.message === "VERSION_CONFLICT") return NextResponse.json({ error: "This record changed elsewhere. Refresh it and retry your edit." }, { status: 409 });
    if (error instanceof Error && error.message === "DUPLICATE_TEAM_CODE") return NextResponse.json({ error: "A team with that registration code already exists." }, { status: 409 });
    if (error instanceof Error && error.message === "SCORE_EXISTS") return NextResponse.json({ error: "You already submitted a score for this team and round. Edit your existing score instead." }, { status: 409 });
    if (error instanceof Error && error.message === "RECORD_NOT_FOUND") return NextResponse.json({ error: "Record not found." }, { status: 404 });
    if (error instanceof Error && error.message === "TRACK_DENIED") return NextResponse.json({ error: "Track access denied." }, { status: 403 });
    if (error instanceof Error && error.message === "NOT_SCORE_OWNER") return NextResponse.json({ error: "You can edit only scores you submitted." }, { status: 403 });
    if (error instanceof Error && error.message === "TEAM_NOT_FOUND") return NextResponse.json({ error: "The selected team does not exist." }, { status: 404 });
    if (error instanceof Error && error.message === "INVALID_INPUT") return NextResponse.json({ error: "The submitted record is invalid." }, { status: 400 });
    return NextResponse.json({ error: "Database write failed. Check Firebase setup." }, { status: 503 });
  }
}

async function saveTeam(data: Record<string, unknown>, user: NonNullable<Awaited<ReturnType<typeof requireAdmin>>>) {
  const db = adminDb();
  const id = typeof data.id === "string" ? data.id : "";
  const expectedVersion = data.expectedVersion;
  const fields = Object.keys(data).filter(key => key !== "id" && key !== "expectedVersion");
  const checkInOnly = fields.length > 0 && fields.every(key => ["checkedIn"].includes(key));
  if (checkInOnly) {
    if (!id || typeof data.checkedIn !== "boolean" || !hasPermission(user, "checkinWrite")) throw new Error("INVALID_INPUT");
    const ref = db.collection("teams").doc(id);
    const updatedAt = new Date().toISOString();
    await db.runTransaction(async transaction => {
      const snapshot = await transaction.get(ref);
      if (!snapshot.exists) throw new Error("RECORD_NOT_FOUND");
      const current = snapshot.data()!;
      if (!canTrack(user, current.trackId)) throw new Error("TRACK_DENIED");
      if (expectedVersion !== versionOf(current)) throw new Error("VERSION_CONFLICT");
      transaction.update(ref, { checkedIn: data.checkedIn, checkInTime: data.checkedIn ? updatedAt : null, updatedAt, updatedBy: user.uid, version: versionOf(current) + 1 });
      transaction.create(db.collection("adminAudit").doc(), { actorUid: user.uid, actorEmail: user.email, action: "team-checkin-updated", collection: "teams", recordId: id, trackId: current.trackId, at: updatedAt });
    });
    return NextResponse.json({ id, version: Number(expectedVersion) + 1 });
  }

  if (!hasPermission(user, "registrationsWrite")) throw new Error("TRACK_DENIED");
  const allowed = new Set(["teamName", "teamCode", "projectTitle", "trackId", "college"]);
  if (!fields.length || fields.some(key => !allowed.has(key))) throw new Error("INVALID_INPUT");
  const record: Record<string, unknown> = {};
  for (const key of allowed) if (key in data) record[key] = data[key];
  if (typeof record.teamName !== "string" || !record.teamName.trim() || record.teamName.length > 120 || typeof record.trackId !== "string" || !trackIds.has(record.trackId)) throw new Error("INVALID_INPUT");
  if (record.teamCode !== undefined && (typeof record.teamCode !== "string" || record.teamCode.length > 40)) throw new Error("INVALID_INPUT");
  if (typeof record.teamCode === "string") record.teamCode = record.teamCode.trim().toUpperCase();
  if (!canTrack(user, record.trackId)) throw new Error("TRACK_DENIED");
  const now = new Date().toISOString();
  const ref = id ? db.collection("teams").doc(id) : db.collection("teams").doc();
  await db.runTransaction(async transaction => {
    const existing = id ? await transaction.get(ref) : null;
    if (id && !existing?.exists) throw new Error("RECORD_NOT_FOUND");
    const current = existing?.data();
    if (id && expectedVersion !== versionOf(current)) throw new Error("VERSION_CONFLICT");
    if (id && !canTrack(user, current?.trackId)) throw new Error("TRACK_DENIED");
    if (record.teamCode) {
      const duplicate = await transaction.get(db.collection("teams").where("teamCode", "==", record.teamCode).limit(1));
      if (duplicate.docs.some(doc => doc.id !== id)) throw new Error("DUPLICATE_TEAM_CODE");
    }
    const next = { ...record, updatedAt: now, updatedBy: user.uid, version: versionOf(current) + 1, ...(current?.checkedIn !== undefined ? { checkedIn: current.checkedIn, checkInTime: current.checkInTime ?? null } : { checkedIn: false, checkInTime: null }) };
    if (id) transaction.set(ref, next, { merge: true });
    else transaction.create(ref, { ...next, createdAt: now, createdBy: user.uid });
    transaction.create(db.collection("adminAudit").doc(), { actorUid: user.uid, actorEmail: user.email, action: id ? "team-updated" : "team-created", collection: "teams", recordId: ref.id, trackId: record.trackId, at: now });
  });
  return NextResponse.json({ id: ref.id });
}

async function saveScore(data: Record<string, unknown>, user: NonNullable<Awaited<ReturnType<typeof requireAdmin>>>) {
  if (!hasPermission(user, "judgingWrite")) throw new Error("TRACK_DENIED");
  const db = adminDb();
  const teamId = typeof data.teamId === "string" ? data.teamId : "";
  const round = data.round;
  const criteria = ["innovation", "technicalDepth", "hardwareExecution", "marketViability", "presentation"] as const;
  if (!teamId || (round !== "round1" && round !== "round2") || criteria.some(key => !Number.isInteger(data[key]) || Number(data[key]) < 1 || Number(data[key]) > 10) || (data.comments !== undefined && (typeof data.comments !== "string" || data.comments.length > 4000))) throw new Error("INVALID_INPUT");
  const values = Object.fromEntries(criteria.map(key => [key, Number(data[key])])) as Record<typeof criteria[number], number>;
  const totalScore = Object.values(values).reduce((total, value) => total + value, 0);
  const now = new Date().toISOString();
  const suppliedId = typeof data.id === "string" ? data.id : "";
  const ref = suppliedId
    ? db.collection("scores").doc(suppliedId)
    : db.collection("scores").doc(`score_${createHash("sha256").update(`${teamId}:${round}:${user.uid}`).digest("hex")}`);
  const teamRef = db.collection("teams").doc(teamId);
  await db.runTransaction(async transaction => {
    const teamSnap = await transaction.get(teamRef);
    if (!teamSnap.exists) throw new Error("TEAM_NOT_FOUND");
    const team = teamSnap.data()!;
    if (!canTrack(user, team.trackId)) throw new Error("TRACK_DENIED");
    const currentSnap = await transaction.get(ref);
    const current = currentSnap.data();
    if (!suppliedId && currentSnap.exists) throw new Error("SCORE_EXISTS");
    if (suppliedId && !currentSnap.exists) throw new Error("RECORD_NOT_FOUND");
    if (suppliedId && current?.judgeUid !== user.uid && user.role !== "owner") throw new Error("NOT_SCORE_OWNER");
    if (suppliedId && data.expectedVersion !== versionOf(current)) throw new Error("VERSION_CONFLICT");
    if (suppliedId && (current?.teamId !== teamId || current?.round !== round)) throw new Error("INVALID_INPUT");
    const record = { ...values, comments: String(data.comments || ""), totalScore, teamId, teamName: team.teamName || "", trackId: team.trackId, round, judgeUid: current?.judgeUid || user.uid, judgeName: current?.judgeName || user.name, updatedAt: now, updatedBy: user.uid, version: versionOf(current) + 1, ...(current ? {} : { createdAt: now, createdBy: user.uid }) };
    if (current) transaction.set(ref, record, { merge: true });
    else transaction.create(ref, record);
    transaction.create(db.collection("adminAudit").doc(), { actorUid: user.uid, actorEmail: user.email, action: current ? "score-updated" : "score-created", collection: "scores", recordId: ref.id, teamId, trackId: team.trackId, previousTotalScore: current?.totalScore ?? null, totalScore, at: now });
  });
  return NextResponse.json({ id: ref.id });
}
