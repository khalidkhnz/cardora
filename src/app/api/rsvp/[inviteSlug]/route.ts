import { NextResponse, type NextRequest } from "next/server";
import { getRsvpsByInviteSlug } from "@/server/db/queries/rsvp";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ inviteSlug: string }> },
) {
  const { inviteSlug } = await params;
  const rsvps = await getRsvpsByInviteSlug(inviteSlug);

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending === "yes").length,
    totalGuests: rsvps.reduce((sum, r) => sum + (r.numberOfGuests ?? 1), 0),
    guests: rsvps.map((r) => ({
      name: r.guestName,
      attending: r.attending,
      guests: r.numberOfGuests,
    })),
  };

  return NextResponse.json(stats);
}
