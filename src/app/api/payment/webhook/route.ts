import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import {
  getPaymentByStripeSession,
  updatePaymentStatus,
  unlockCard,
  unlockInvite,
} from "@/server/db/queries/payment";
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
    }
  }

  return NextResponse.json({ received: true });
}
