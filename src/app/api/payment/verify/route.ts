import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import {
  getPaymentByRazorpayOrder,
  updatePaymentStatus,
  updatePaymentRazorpayId,
  unlockInviteById,
} from "@/server/db/queries/payment";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    await updatePaymentStatus(dbPayment.id, "completed");
    await updatePaymentRazorpayId(dbPayment.id, body.razorpay_payment_id);

    // Auto-unlock invite if this payment is for an invite
    if (
      (dbPayment.purpose === "animated_invite" ||
        dbPayment.purpose === "invite_unlock") &&
      dbPayment.inviteId
    ) {
      await unlockInviteById(dbPayment.inviteId, session.user.id);
    }

    return NextResponse.json({
      status: "completed",
      amount: dbPayment.amount,
      currency: dbPayment.currency,
    });
  } catch (error) {
    console.error("[Payment] Verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
