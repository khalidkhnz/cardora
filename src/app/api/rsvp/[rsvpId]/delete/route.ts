import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { deleteRsvp } from "@/server/db/queries/rsvp";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ rsvpId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { rsvpId } = await params;
  const result = await deleteRsvp(rsvpId, session.user.id);

  if (!result) {
    return NextResponse.json(
      { error: "RSVP not found or unauthorized" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
