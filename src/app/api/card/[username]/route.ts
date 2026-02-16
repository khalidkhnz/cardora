import { NextResponse, type NextRequest } from "next/server";
import { getUserProfileByUsername } from "@/server/db/queries/user";
import { getCardSettings } from "@/server/db/queries/card";
import { db } from "@/server/db";
import { analyticsEvent } from "@/server/db/schema/analytics";

function getDeviceType(userAgent: string): "mobile" | "tablet" | "desktop" {
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  return "desktop";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  const userData = await getUserProfileByUsername(username);
  if (!userData?.profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!userData.profile.profileEnabled) {
    return NextResponse.json(
      { error: "Profile is disabled" },
      { status: 403 },
    );
  }

  // Track profile_view analytics event
  const userAgent = request.headers.get("user-agent") ?? "";
  const referer = request.headers.get("referer") ?? "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // Fire and forget analytics
  void db
    .insert(analyticsEvent)
    .values({
      userId: userData.profile.userId,
      type: "profile_view",
      deviceType: getDeviceType(userAgent),
      userAgent,
      ipAddress: ip,
      referer,
    })
    .catch((_e: unknown) => { /* analytics failure is non-critical */ });

  // Get card settings
  const settings = await getCardSettings(userData.profile.userId);

  return NextResponse.json({
    name: userData.name,
    email: userData.email,
    username: userData.profile.username,
    profession: userData.profile.profession,
    company: userData.profile.company,
    phone: userData.profile.phone,
    whatsapp: userData.profile.whatsapp,
    address: userData.profile.address,
    socialLinks: userData.profile.socialLinks,
    profileImage: userData.profile.profileImage,
    cardBackgroundImage: userData.profile.cardBackgroundImage,
    paymentEnabled: userData.profile.paymentEnabled,
    paymentType: userData.profile.paymentType,
    fixedAmount: userData.profile.fixedAmount,
    country: userData.profile.country,
    currency: userData.profile.currency,
    cardType: settings?.cardType ?? "business",
    selectedTemplateId: settings?.selectedTemplateId,
  });
}
