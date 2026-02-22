import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/server/db/queries/payment";
import { getUserProfileByUsername } from "@/server/db/queries/user";
import { platform } from "@/lib/platform";
import { getOriginFromRequest } from "@/server/auth-helpers";

const createPublicSessionSchema = z.object({
  username: z.string().min(1),
  amount: z.number().int().min(50).max(10_000_00),
  currency: z.string().length(3).regex(/^[A-Za-z]{3}$/),
  payerEmail: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  const rawBody: unknown = await request.json();
  const parsed = createPublicSessionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  // Look up the profile owner by username
  const userData = await getUserProfileByUsername(body.username);
  if (!userData?.profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (!userData.profile.paymentEnabled) {
    return NextResponse.json(
      { error: "This user does not accept payments" },
      { status: 403 },
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 },
    );
  }

  const recipientId = userData.profile.userId;

  try {
    const origin = getOriginFromRequest(request);
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: body.currency.toLowerCase(),
            product_data: {
              name: `${platform.name} - Payment to ${userData.name}`,
            },
            unit_amount: body.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&public=1`,
      cancel_url: `${origin}/pay/${body.username}`,
      customer_email: body.payerEmail,
      metadata: {
        recipientId,
        purpose: "payment",
      },
    });

    // Record payment in DB — userId is set to recipientId since there's no payer account
    await createPayment({
      userId: recipientId,
      recipientId,
      amount: body.amount,
      currency: body.currency,
      paymentMethod: "stripe",
      stripeSessionId: stripeSession.id,
      status: "pending",
      purpose: "payment",
      payerEmail: body.payerEmail,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[Payment] Create public session error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 },
    );
  }
}
