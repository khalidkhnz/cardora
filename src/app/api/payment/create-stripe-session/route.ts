import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/server/db/queries/payment";
import { platform } from "@/lib/platform";
import { getOriginFromRequest } from "@/server/auth-helpers";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    amount: number;
    currency: string;
    purpose:
      | "card_unlock"
      | "business_card"
      | "invite_unlock"
      | "animated_invite"
      | "cart_checkout"
      | "payment";
    payerEmail?: string;
  };

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 },
    );
  }

  try {
    const origin = getOriginFromRequest(request);
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: body.currency.toLowerCase(),
            product_data: {
              name: `${platform.name} - ${body.purpose}`,
            },
            unit_amount: body.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      customer_email: body.payerEmail ?? session.user.email,
      metadata: {
        userId: session.user.id,
        purpose: body.purpose,
      },
    });

    // Record payment in DB
    await createPayment({
      userId: session.user.id,
      amount: body.amount,
      currency: body.currency,
      paymentMethod: "stripe",
      stripeSessionId: stripeSession.id,
      status: "pending",
      purpose: body.purpose,
      payerEmail: body.payerEmail ?? session.user.email,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[Payment] Create session error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 },
    );
  }
}
