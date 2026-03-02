import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { getRazorpay } from "@/lib/razorpay";
import { createPayment } from "@/server/db/queries/payment";

const cartOrderSchema = z.object({
  items: z
    .array(
      z.object({
        name: z.string().min(1).max(200),
        quantity: z.number().int().min(1).max(100),
        unitPrice: z.number().int().min(100).max(100_000_00),
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
  const parsed = cartOrderSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 },
    );
  }

  try {
    const total = body.items.reduce(
      (sum, i) => sum + i.unitPrice * i.quantity,
      0,
    );

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: total,
      currency: body.currency.toUpperCase(),
      receipt: `cart_${Date.now()}`,
    });

    await createPayment({
      userId: session.user.id,
      amount: total,
      currency: body.currency,
      paymentMethod: "razorpay",
      razorpayOrderId: order.id,
      status: "pending",
      purpose: "cart_checkout",
      payerEmail: session.user.email,
      itemData: { items: body.items },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[Payment] Create cart order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 },
    );
  }
}
