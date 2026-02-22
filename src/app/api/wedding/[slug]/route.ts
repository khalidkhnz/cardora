import { NextResponse, type NextRequest } from "next/server";
import { getWeddingInviteBySlug } from "@/server/db/queries/wedding";
import { platform } from "@/lib/platform";

const demo = platform.demoData;

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
      groomName: demo.groomName,
      brideName: demo.brideName,
      weddingDate: demo.weddingDate,
      venue: demo.venue,
      venueAddress: demo.venueAddress,
      story: demo.story,
      heroImage: demo.heroImage,
      couplePhoto: demo.couplePhoto,
      backgroundImage: demo.backgroundImage,
      galleryImages: demo.galleryImages,
      isDemo: true,
    });
  }

  return NextResponse.json({ ...invite, isDemo: false });
}
