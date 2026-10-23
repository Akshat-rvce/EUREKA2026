import { NextResponse } from "next/server";
import { currentAdmin } from "@/lib/adminServer";
export async function GET() {
  const user = await currentAdmin();
  return user ? NextResponse.json({ user }) : NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
