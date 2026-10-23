import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminServer";
import type { Permission } from "@/lib/adminAccess";

const collections = ["teams", "scores"] as const;
type Collection = typeof collections[number];
const permissionFor: Record<Collection, Permission> = { teams: "registrationsRead", scores: "judgingRead" };

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection") as Collection;
  if (!collections.includes(collection)) return NextResponse.json({ error: "Unknown data collection." }, { status: 400 });
  const user = await requireAdmin(permissionFor[collection]);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const snap = await adminDb().collection(collection).get();
    let rows = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (user.role !== "owner") rows = rows.filter((row: any) => user.trackIds?.includes(row.trackId));
    return NextResponse.json({ rows });
  } catch { return NextResponse.json({ error: "Shared database is not configured." }, { status: 503 }); }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const collection = body.collection as Collection;
  if (!collections.includes(collection)) return NextResponse.json({ error: "Unknown data collection." }, { status: 400 });
  const data = body.data || {};
  if (!data || typeof data !== "object" || Array.isArray(data)) return NextResponse.json({ error: "Missing record." }, { status: 400 });
  const isCheckInOnly = collection === "teams" && Object.keys(data).every((key: string) => ["id", "checkedIn", "checkInTime"].includes(key));
  const user = await requireAdmin(collection === "scores" ? "judgingWrite" : isCheckInOnly ? "checkinWrite" : "registrationsWrite");
  if (!user || !collections.includes(collection)) return NextResponse.json({ error: "Not permitted." }, { status: 403 });
  const { id, ...record } = data;
  try {
    const ref = id ? adminDb().collection(collection).doc(String(id)) : adminDb().collection(collection).doc();
    const existing = id ? await ref.get() : null;
    if (id && !existing?.exists) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    const trackId = record.trackId || existing?.data()?.trackId;
    if (user.role !== "owner" && (!trackId || !user.trackIds?.includes(trackId))) return NextResponse.json({ error: "Track access denied." }, { status: 403 });
    await ref.set({ ...record, updatedAt: new Date().toISOString(), updatedBy: user.uid }, { merge: true });
    await adminDb().collection("adminAudit").add({ actorUid: user.uid, actorEmail: user.email, action: id ? "update" : "create", collection, recordId: ref.id, at: new Date().toISOString() });
    return NextResponse.json({ id: ref.id });
  } catch { return NextResponse.json({ error: "Database write failed. Check Firebase setup." }, { status: 503 }); }
}
