import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/server/db/queries/payment";
import { platform } from "@/lib/platform";
import { getOriginFromRequest } from "@/server/auth-helpers";

const createSessionSchema = z.object({
  amount: z.number().int().min(50).max(10_000_00), // min 50 cents, max $100,000
  currency: z.string().length(3).regex(/^[A-Za-z]{3}$/),
  purpose: z.enum([
    "card_unlock",
    "business_card",
    "invite_unlock",
    "animated_invite",
    "cart_checkout",
    "payment",
  ]),
  inviteId: z.string().optional(),
  payerEmail: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody: unknown = await request.json();
  const parsed = createSessionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  // Require inviteId for invite-related payments
  if (
    (body.purpose === "animated_invite" || body.purpose === "invite_unlock") &&
    !body.inviteId
  ) {
    return NextResponse.json(
      { error: "inviteId is required for invite payments" },
      { status: 400 },
    );
  }

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
      ...(body.payerEmail ?? session.user.email
        ? { customer_email: body.payerEmail ?? session.user.email }
        : {}),
      metadata: {
        userId: session.user.id,
        purpose: body.purpose,
        ...(body.inviteId ? { inviteId: body.inviteId } : {}),
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
      inviteId: body.inviteId,
      payerEmail: body.payerEmail ?? session.user.email,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[Payment] Create session error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create payment session", details: message },
      { status: 500 },
    );
  }
}
