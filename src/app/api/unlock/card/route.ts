import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { stripe } from "@/lib/stripe";
import {
  getPaymentByStripeSession,
  updatePaymentStatus,
  unlockCard,
} from "@/server/db/queries/payment";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { sessionId?: string };

  if (!body.sessionId) {
    return NextResponse.json(
      { error: "Stripe session ID required" },
      { status: 400 },
    );
  }

  try {
    const stripeSession = await stripe.checkout.sessions.retrieve(
      body.sessionId,
    );

    if (stripeSession.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed", status: stripeSession.payment_status },
        { status: 402 },
      );
    }

    const dbPayment = await getPaymentByStripeSession(body.sessionId);
    if (dbPayment) {
      await updatePaymentStatus(
        dbPayment.id,
        "completed",
        stripeSession.payment_intent as string,
      );
    }

    await unlockCard(session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Unlock] Card unlock error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
