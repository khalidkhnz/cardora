import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { analyticsEvent } from "@/server/db/schema/analytics";
import { user } from "@/server/db/schema/auth";
import { getApiSession } from "@/server/auth-helpers";

const trackSchema = z.object({
  userId: z.string(),
  type: z.enum([
    "profile_view",
    "payment_view",
    "payment_success",
    "qr_scan",
    "nfc_tap",
    "link_click",
    "cart_payment_view",
    "cart_payment_success",
  ]),
});

// Event types that track views on another user's public pages (userId = the profile owner)
const PUBLIC_EVENT_TYPES = new Set([
  "profile_view",
  "payment_view",
  "qr_scan",
  "nfc_tap",
  "link_click",
  "cart_payment_view",
]);

function getDeviceType(
  userAgent: string,
): "mobile" | "tablet" | "desktop" {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  return "desktop";
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();
    const parsed = trackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed" },
        { status: 400 },
      );
    }

    const { userId: targetUserId, type: eventType } = parsed.data;

    // For public events (viewing someone's profile/page), verify the target user exists
    if (PUBLIC_EVENT_TYPES.has(eventType)) {
      const targetUser = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.id, targetUserId))
        .limit(1);

      if (!targetUser[0]) {
        return NextResponse.json(
          { error: "Invalid user" },
          { status: 400 },
        );
      }
    } else {
      // For non-public events (payment_success, cart_payment_success),
      // userId must match the authenticated session
      const session = await getApiSession(request);
      if (session?.user.id !== targetUserId) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 },
        );
      }
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const referer = request.headers.get("referer") ?? "";
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";

    await db.insert(analyticsEvent).values({
      userId: parsed.data.userId,
      type: parsed.data.type,
      deviceType: getDeviceType(userAgent),
      userAgent,
      ipAddress: ip,
      referer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics] Track error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 },
    );
  }
}
