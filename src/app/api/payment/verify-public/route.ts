import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import {
  getPaymentByRazorpayOrder,
  updatePaymentStatus,
  updatePaymentRazorpayId,
} from "@/server/db/queries/payment";
import { db } from "@/server/db";
import { user } from "@/server/db/schema/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
  };

  if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
    return NextResponse.json(
      { error: "Missing Razorpay payment data" },
      { status: 400 },
    );
  }

  try {
    const isValid = verifyRazorpaySignature(
      body.razorpay_order_id,
      body.razorpay_payment_id,
      body.razorpay_signature,
    );

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    const dbPayment = await getPaymentByRazorpayOrder(body.razorpay_order_id);

    if (!dbPayment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 },
      );
    }

    // Only allow verification of public payments
    if (dbPayment.purpose !== "payment") {
      return NextResponse.json(
        { error: "Invalid payment type" },
        { status: 403 },
      );
    }

    let recipientName: string | null = null;
    if (dbPayment.recipientId) {
      const recipientData = await db
        .select({ name: user.name })
        .from(user)
        .where(eq(user.id, dbPayment.recipientId))
        .limit(1);
      recipientName = recipientData[0]?.name ?? null;
    }

    await updatePaymentStatus(dbPayment.id, "completed");
    await updatePaymentRazorpayId(dbPayment.id, body.razorpay_payment_id);

    return NextResponse.json({
      status: "completed",
      amount: dbPayment.amount,
      currency: dbPayment.currency,
      recipientName,
    });
  } catch (error) {
    console.error("[Payment] Verify public error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
