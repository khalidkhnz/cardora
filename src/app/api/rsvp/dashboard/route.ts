import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getDashboardRsvps } from "@/server/db/queries/rsvp";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getDashboardRsvps(session.user.id);
  return NextResponse.json(data);
}
