import { NextResponse } from "next/server";

/** Legacy compatibility endpoint; the custom portal no longer exposes owner configuration. */
export async function GET() {
  return NextResponse.json({ error: "This endpoint is no longer available." }, { status: 410 });
}
