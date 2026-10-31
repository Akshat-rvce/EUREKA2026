import { NextResponse } from "next/server";
import { currentUser } from "@/lib/adminServer";
export async function GET() {
  const user = await currentUser();
  return user ? NextResponse.json({ user: { ...user, uid: user.id } }, { headers: { "Cache-Control": "no-store" } }) : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}