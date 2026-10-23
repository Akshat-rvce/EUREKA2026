import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import { currentAdmin } from "@/lib/adminServer";

export async function PATCH(request: NextRequest) {
  const user = await currentAdmin();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { changed } = await request.json();
  if (changed !== true) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  await adminDb().collection("adminUsers").doc(user.uid).update({ mustChangePassword: false, passwordChangedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
