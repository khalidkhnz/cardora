import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { getRazorpay } from "@/lib/razorpay";
import { createPayment } from "@/server/db/queries/payment";

const createOrderSchema = z.object({
  amount: z.number().int().min(100).max(100_000_00),
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
  const parsed = createOrderSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  if (
    (body.purpose === "animated_invite" || body.purpose === "invite_unlock") &&
    !body.inviteId
  ) {
    return NextResponse.json(
      { error: "inviteId is required for invite payments" },
      { status: 400 },
    );
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 },
    );
  }

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: body.amount,
      currency: body.currency.toUpperCase(),
      receipt: `order_${Date.now()}`,
    });

    await createPayment({
      userId: session.user.id,
      amount: body.amount,
      currency: body.currency,
      paymentMethod: "razorpay",
      razorpayOrderId: order.id,
      status: "pending",
      purpose: body.purpose,
      inviteId: body.inviteId,
      payerEmail: body.payerEmail ?? session.user.email,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[Payment] Create order error:", error);
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create payment order", details: message },
      { status: 500 },
    );
  }
}
