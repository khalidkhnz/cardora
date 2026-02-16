import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { payment } from "@/server/db/schema/payment";
import { userProfile } from "@/server/db/schema/profile";

export async function createPayment(data: {
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: "stripe" | "interac";
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  purpose:
    | "card_unlock"
    | "business_card"
    | "invite_unlock"
    | "animated_invite"
    | "cart_checkout"
    | "payment";
  payerEmail?: string;
  payerName?: string;
  itemData?: Record<string, unknown>;
}) {
  const result = await db
    .insert(payment)
    .values(data)
    .returning();

  return result[0]!;
}

export async function getPaymentHistory(userId: string) {
  return db
    .select()
    .from(payment)
    .where(eq(payment.userId, userId))
    .orderBy(sql`${payment.createdAt} desc`);
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
  stripePaymentIntentId?: string,
) {
  await db
    .update(payment)
    .set({
      status,
      ...(stripePaymentIntentId ? { stripePaymentIntentId } : {}),
    })
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
