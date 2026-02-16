import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { stripe } from "@/lib/stripe";
import {
  getPaymentByStripeSession,
  updatePaymentStatus,
} from "@/server/db/queries/payment";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    if (stripeSession.payment_status === "paid") {
      await updatePaymentStatus(
        dbPayment.id,
        "completed",
        stripeSession.payment_intent as string,
      );

      return NextResponse.json({
        status: "completed",
        amount: dbPayment.amount,
        currency: dbPayment.currency,
      });
    }

    return NextResponse.json({
      status: stripeSession.payment_status,
    });
  } catch (error) {
    console.error("[Payment] Verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
