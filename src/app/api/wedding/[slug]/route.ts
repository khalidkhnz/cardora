import { NextResponse, type NextRequest } from "next/server";
import { getWeddingInviteBySlug } from "@/server/db/queries/wedding";

const DEMO_DATA = {
  groomName: "John",
  brideName: "Jane",
  weddingDate: "2025-06-15",
  venue: "Grand Ballroom",
  venueAddress: "123 Celebration Ave, Toronto, ON",
  story: "We met at a coffee shop and knew it was meant to be...",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const invite = await getWeddingInviteBySlug(slug);

  if (!invite) {
    return NextResponse.json({ error: "Invite not found" }, { status: 404 });
  }

  // If unpaid, return demo data with a flag
  if (!invite.isPaid) {
    return NextResponse.json({
      ...invite,
      groomName: DEMO_DATA.groomName,
      brideName: DEMO_DATA.brideName,
      weddingDate: DEMO_DATA.weddingDate,
      venue: DEMO_DATA.venue,
      venueAddress: DEMO_DATA.venueAddress,
      story: DEMO_DATA.story,
      isDemo: true,
    });
  }

  return NextResponse.json({ ...invite, isDemo: false });
}
