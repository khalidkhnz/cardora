import { NextResponse, type NextRequest } from "next/server";
import { getRsvpsByInviteSlug } from "@/server/db/queries/rsvp";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ inviteSlug: string }> },
) {
  const { inviteSlug } = await params;
  const rsvps = await getRsvpsByInviteSlug(inviteSlug);

  // Only return aggregate stats - no guest names, emails, or personal details
  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending === "yes").length,
    declined: rsvps.filter((r) => r.attending === "no").length,
    maybe: rsvps.filter((r) => r.attending === "maybe").length,
    totalGuests: rsvps.reduce((sum, r) => sum + (r.numberOfGuests ?? 1), 0),
  };

  return NextResponse.json(stats);
}
