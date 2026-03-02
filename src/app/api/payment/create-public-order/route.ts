import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getRazorpay } from "@/lib/razorpay";
import { createPayment } from "@/server/db/queries/payment";
import { getUserProfileByUsername } from "@/server/db/queries/user";

const createPublicOrderSchema = z.object({
  username: z.string().min(1),
  amount: z.number().int().min(100).max(100_000_00),
  currency: z.string().length(3).regex(/^[A-Za-z]{3}$/),
  payerEmail: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  const rawBody: unknown = await request.json();
  const parsed = createPublicOrderSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body = parsed.data;

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

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 },
    );
  }

  const recipientId = userData.profile.userId;

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: body.amount,
      currency: body.currency.toUpperCase(),
      receipt: `pub_${Date.now()}`,
    });

    await createPayment({
      userId: recipientId,
      recipientId,
      amount: body.amount,
      currency: body.currency,
      paymentMethod: "razorpay",
      razorpayOrderId: order.id,
      status: "pending",
      purpose: "payment",
      payerEmail: body.payerEmail,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[Payment] Create public order error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 },
    );
  }
}
