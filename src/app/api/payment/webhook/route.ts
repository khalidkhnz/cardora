import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import {
  getPaymentByStripeSession,
  updatePaymentStatus,
  unlockCard,
  unlockInvite,
} from "@/server/db/queries/payment";
import { sendPaymentSuccessEmail } from "@/server/utils/email";
import { getOriginFromRequest } from "@/server/auth-helpers";
import { db } from "@/server/db";
import { user } from "@/server/db/schema/auth";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("[Webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const dbPayment = await getPaymentByStripeSession(session.id);
    if (dbPayment) {
      await updatePaymentStatus(
        dbPayment.id,
        "completed",
        session.payment_intent as string,
      );

      // Auto-unlock based on purpose
      if (
        dbPayment.purpose === "card_unlock" ||
        dbPayment.purpose === "business_card"
      ) {
        await unlockCard(dbPayment.userId);
      } else if (
        dbPayment.purpose === "invite_unlock" ||
        dbPayment.purpose === "animated_invite"
      ) {
        await unlockInvite(dbPayment.userId);
      } else if (dbPayment.purpose === "cart_checkout") {
        // Unlock both for cart purchases
        await unlockCard(dbPayment.userId);
        await unlockInvite(dbPayment.userId);
      }

      // Send payment success email (fire-and-forget)
      void (async () => {
        try {
          const owner = await db
            .select({ name: user.name, email: user.email })
            .from(user)
            .where(eq(user.id, dbPayment.userId))
            .limit(1);

          const ownerData = owner[0];
          if (!ownerData) return;

          const origin = getOriginFromRequest(request);
          await sendPaymentSuccessEmail(
            dbPayment.payerEmail ?? ownerData.email,
            ownerData.name,
            {
              id: dbPayment.id,
              amount: dbPayment.amount,
              currency: dbPayment.currency,
              purpose: dbPayment.purpose,
              createdAt: dbPayment.createdAt,
            },
            origin,
          );
        } catch (emailErr) {
          console.error("[Webhook] Email notification error:", emailErr);
        }
      })();
    }
  }

  return NextResponse.json({ received: true });
}
