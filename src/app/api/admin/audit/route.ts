import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { requireAdmin } from "@/lib/adminServer";

export async function GET() {
  const user = await requireAdmin("accountsManage");
  if (!user || user.role !== "owner") return NextResponse.json({ error: "Only the owner can view audit history." }, { status: 403 });
  const snap = await adminDb().collection("adminAudit").orderBy("at", "desc").limit(100).get();
  return NextResponse.json({ events: snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
}
