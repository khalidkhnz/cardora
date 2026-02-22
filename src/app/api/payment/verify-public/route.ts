import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { stripe } from "@/lib/stripe";
import {
  getPaymentByStripeSession,
  updatePaymentStatus,
} from "@/server/db/queries/payment";
import { db } from "@/server/db";
import { user } from "@/server/db/schema/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { sessionId: string };

  if (!body.sessionId) {
    return NextResponse.json(
      { error: "Session ID required" },
      { status: 400 },
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(
      body.sessionId,
    );

    const dbPayment = await getPaymentByStripeSession(body.sessionId);

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

    if (stripeSession.payment_status === "paid") {
      await updatePaymentStatus(dbPayment.id, "completed");

      return NextResponse.json({
        status: "completed",
        amount: dbPayment.amount,
        currency: dbPayment.currency,
        recipientName,
      });
    }

    return NextResponse.json({
      status: stripeSession.payment_status,
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
