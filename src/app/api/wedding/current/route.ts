import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import {
  getCurrentUserInvite,
  deleteUserInvite,
} from "@/server/db/queries/wedding";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const invite = await getCurrentUserInvite(session.user.id);
  return NextResponse.json(invite);
}

export async function DELETE(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await deleteUserInvite(session.user.id);
  if (!result) {
    return NextResponse.json(
      { error: "No wedding invite found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
