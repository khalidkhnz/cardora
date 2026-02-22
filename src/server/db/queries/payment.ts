import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { payment } from "@/server/db/schema/payment";
import { userProfile } from "@/server/db/schema/profile";

export async function createPayment(data: {
  userId: string;
  recipientId?: string;
  amount: number;
  currency: string;
  paymentMethod: "stripe" | "interac";
  stripeSessionId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  purpose:
    | "card_unlock"
    | "business_card"
    | "invite_unlock"
    | "animated_invite"
    | "cart_checkout"
    | "payment";
  payerEmail?: string;
  itemData?: Record<string, unknown>;
}) {
  const result = await db
    .insert(payment)
    .values(data)
    .returning();

  return result[0]!;
}

export async function getPaymentHistory(
  userId: string,
  opts: { limit: number; offset: number } = { limit: 20, offset: 0 },
) {
  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(payment)
      .where(eq(payment.userId, userId))
      .orderBy(sql`${payment.createdAt} desc`)
      .limit(opts.limit)
      .offset(opts.offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(payment)
      .where(eq(payment.userId, userId)),
  ]);

  return {
    data: items,
    total: countResult[0]?.count ?? 0,
    limit: opts.limit,
    offset: opts.offset,
  };
}

export async function getReceivedPayments(
  userId: string,
  opts: { limit: number; offset: number } = { limit: 20, offset: 0 },
) {
  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(payment)
      .where(eq(payment.recipientId, userId))
      .orderBy(sql`${payment.createdAt} desc`)
      .limit(opts.limit)
      .offset(opts.offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(payment)
      .where(eq(payment.recipientId, userId)),
  ]);

  return {
    data: items,
    total: countResult[0]?.count ?? 0,
    limit: opts.limit,
    offset: opts.offset,
  };
}

export async function getPaymentByStripeSession(sessionId: string) {
  const results = await db
    .select()
    .from(payment)
    .where(eq(payment.stripeSessionId, sessionId))
    .limit(1);

  return results[0] ?? null;
}

export async function updatePaymentStatus(
  paymentId: string,
  status: "pending" | "completed" | "failed" | "refunded",
) {
  await db
    .update(payment)
    .set({ status, updatedAt: new Date() })
    .where(eq(payment.id, paymentId));
}

export async function unlockCard(userId: string) {
  await db
    .update(userProfile)
    .set({ cardPaid: true, updatedAt: new Date() })
    .where(eq(userProfile.userId, userId));
}

export async function unlockInvite(userId: string) {
  await db
    .update(userProfile)
    .set({ invitePaid: true, updatedAt: new Date() })
    .where(eq(userProfile.userId, userId));
}
