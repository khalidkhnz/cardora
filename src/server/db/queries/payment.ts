import "server-only";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { payment } from "@/server/db/schema/payment";
import { weddingInvite } from "@/server/db/schema/wedding";

export async function createPayment(data: {
  userId: string;
  recipientId?: string;
  amount: number;
  currency: string;
  paymentMethod: "razorpay" | "interac";
  razorpayOrderId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  purpose:
    | "card_unlock"
    | "business_card"
    | "invite_unlock"
    | "animated_invite"
    | "cart_checkout"
    | "payment";
  inviteId?: string;
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

export async function getPaymentByRazorpayOrder(orderId: string) {
  const results = await db
    .select()
    .from(payment)
    .where(eq(payment.razorpayOrderId, orderId))
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

export async function updatePaymentRazorpayId(
  paymentId: string,
  razorpayPaymentId: string,
) {
  await db
    .update(payment)
    .set({ razorpayPaymentId, updatedAt: new Date() })
    .where(eq(payment.id, paymentId));
}

/**
 * Unlock a specific invite by setting isPaid = true on the weddingInvite row.
 */
export async function unlockInviteById(inviteId: string, userId: string) {
  const result = await db
    .update(weddingInvite)
    .set({ isPaid: true, updatedAt: new Date() })
    .where(and(eq(weddingInvite.id, inviteId), eq(weddingInvite.userId, userId)))
    .returning();

  return result[0] ?? null;
}
