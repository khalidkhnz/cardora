import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/server/db";
import { analyticsEvent } from "@/server/db/schema/analytics";

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
