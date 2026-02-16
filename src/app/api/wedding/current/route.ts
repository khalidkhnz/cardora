import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getCurrentUserInvite } from "@/server/db/queries/wedding";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invite = await getCurrentUserInvite(session.user.id);
  return NextResponse.json(invite);
}
