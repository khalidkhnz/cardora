import "server-only";
import { eq, sql, and, gte } from "drizzle-orm";
import { db } from "@/server/db";
import { analyticsEvent } from "@/server/db/schema/analytics";

export async function getAnalyticsSummary(userId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Total profile views
  const totalViews = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "profile_view"),
      ),
    );

  // Last 30 days views
  const recentViews = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "profile_view"),
        gte(analyticsEvent.createdAt, thirtyDaysAgo),
      ),
    );

  // Payment views
  const paymentViews = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "payment_view"),
      ),
    );

  // Payment successes
  const paymentSuccesses = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "payment_success"),
      ),
    );

  // Device breakdown
  const deviceBreakdown = await db
    .select({
      deviceType: analyticsEvent.deviceType,
      count: sql<number>`count(*)::int`,
    })
    .from(analyticsEvent)
    .where(eq(analyticsEvent.userId, userId))
    .groupBy(analyticsEvent.deviceType);

  // QR scans
  const qrScans = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "qr_scan"),
      ),
    );

  // NFC taps
  const nfcTaps = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(analyticsEvent)
    .where(
      and(
        eq(analyticsEvent.userId, userId),
        eq(analyticsEvent.type, "nfc_tap"),
      ),
    );

  return {
    totalViews: totalViews[0]?.count ?? 0,
    recentViews: recentViews[0]?.count ?? 0,
    paymentViews: paymentViews[0]?.count ?? 0,
    paymentSuccesses: paymentSuccesses[0]?.count ?? 0,
    qrScans: qrScans[0]?.count ?? 0,
    nfcTaps: nfcTaps[0]?.count ?? 0,
    deviceBreakdown: deviceBreakdown.map((d) => ({
      device: d.deviceType ?? "unknown",
      count: d.count,
    })),
  };
}

export async function getVisitors(
  userId: string,
  page: number,
  pageSize = 50,
) {
  const offset = (page - 1) * pageSize;

  const [visitors, totalResult] = await Promise.all([
    db
      .select({
        id: analyticsEvent.id,
        type: analyticsEvent.type,
        deviceType: analyticsEvent.deviceType,
        userAgent: analyticsEvent.userAgent,
        ipAddress: analyticsEvent.ipAddress,
        referer: analyticsEvent.referer,
        createdAt: analyticsEvent.createdAt,
      })
      .from(analyticsEvent)
      .where(eq(analyticsEvent.userId, userId))
      .orderBy(sql`${analyticsEvent.createdAt} desc`)
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(analyticsEvent)
      .where(eq(analyticsEvent.userId, userId)),
  ]);

  return {
    visitors: visitors.map((v) => ({
      ...v,
      // Mask IP for privacy (show first two octets)
      ipAddress: v.ipAddress
        ? v.ipAddress.split(".").slice(0, 2).join(".") + ".***"
        : "unknown",
      browser: detectBrowser(v.userAgent ?? ""),
    })),
    total: totalResult[0]?.count ?? 0,
    page,
    pageSize,
    totalPages: Math.ceil((totalResult[0]?.count ?? 0) / pageSize),
  };
}

function detectBrowser(userAgent: string): string {
  if (/edg/i.test(userAgent)) return "Edge";
  if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return "Chrome";
  if (/firefox/i.test(userAgent)) return "Firefox";
  if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
  if (/opera|opr/i.test(userAgent)) return "Opera";
  return "Other";
}
