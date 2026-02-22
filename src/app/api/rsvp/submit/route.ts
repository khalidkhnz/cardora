import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { submitRsvp } from "@/server/db/queries/rsvp";
import { submitRsvpSchema } from "@/lib/validators";
import { sendRSVPNotificationEmail, sendRSVPConfirmationEmail } from "@/server/utils/email";
import { getOriginFromRequest } from "@/server/auth-helpers";
import { db } from "@/server/db";
import { weddingInvite } from "@/server/db/schema/wedding";
import { user } from "@/server/db/schema/auth";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = submitRsvpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Validate the invite exists before accepting the RSVP
    const invite = await db
      .select({
        userId: weddingInvite.userId,
        groomName: weddingInvite.groomName,
        brideName: weddingInvite.brideName,
        weddingDate: weddingInvite.weddingDate,
        venue: weddingInvite.venue,
      })
      .from(weddingInvite)
      .where(eq(weddingInvite.slug, parsed.data.inviteSlug))
      .limit(1);

    const inviteData = invite[0];
    if (!inviteData) {
      return NextResponse.json(
        { error: "Wedding invite not found" },
        { status: 404 },
      );
    }

    const result = await submitRsvp(parsed.data);

    // Send RSVP notification email to the invite owner (fire-and-forget)
    void (async () => {
      try {

        const owner = await db
          .select({ email: user.email })
          .from(user)
          .where(eq(user.id, inviteData.userId))
          .limit(1);

        const ownerEmail = owner[0]?.email;
        if (!ownerEmail) return;

        const coupleName = [inviteData.groomName, inviteData.brideName]
          .filter(Boolean)
          .join(" & ");

        const origin = getOriginFromRequest(request);

        await sendRSVPNotificationEmail(ownerEmail, {
          name: parsed.data.guestName,
          email: parsed.data.guestEmail ?? undefined,
          attending: parsed.data.attending,
          numberOfGuests: parsed.data.numberOfGuests ?? 1,
          dietaryRestrictions: parsed.data.dietaryRestrictions ?? undefined,
          message: parsed.data.message ?? undefined,
          phone: parsed.data.phone ?? undefined,
        }, coupleName || "the couple", origin);

        // Send confirmation email to guest if attending and email provided
        if (parsed.data.attending === "yes" && parsed.data.guestEmail) {
          await sendRSVPConfirmationEmail(parsed.data.guestEmail, {
            name: parsed.data.guestName,
            numberOfGuests: parsed.data.numberOfGuests ?? 1,
          }, {
            coupleName: coupleName || "the couple",
            date: inviteData.weddingDate ?? null,
            venue: inviteData.venue ?? null,
            slug: parsed.data.inviteSlug,
          }, origin);
        }
      } catch (emailErr) {
        console.error("[RSVP] Email notification error:", emailErr);
      }
    })();

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("[RSVP] Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 },
    );
  }
}
