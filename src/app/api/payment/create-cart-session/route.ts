import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { stripe } from "@/lib/stripe";
import { createPayment } from "@/server/db/queries/payment";
import { getOriginFromRequest } from "@/server/auth-helpers";

const cartSessionSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        quantity: z.number().int().min(1).max(100),
        unitPrice: z.number().int().min(50).max(10_000_00),
      }),
    )
    .min(1)
    .max(50),
  currency: z.string().length(3).regex(/^[A-Za-z]{3}$/),
});

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody: unknown = await request.json();
  const parsed = cartSessionSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 503 },
    );
  }

  try {
    const lineItems = body.items.map((item) => ({
      price_data: {
        currency: body.currency.toLowerCase(),
        product_data: { name: item.name },
        unit_amount: item.unitPrice,
      },
      quantity: item.quantity,
    }));

    const total = body.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );

    const origin = getOriginFromRequest(request);
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        purpose: "cart_checkout",
      },
    });

    await createPayment({
      userId: session.user.id,
      amount: total,
      currency: body.currency,
      paymentMethod: "stripe",
      stripeSessionId: stripeSession.id,
      status: "pending",
      purpose: "cart_checkout",
      payerEmail: session.user.email,
      itemData: { items: body.items },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("[Payment] Create cart session error:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 },
    );
  }
}
