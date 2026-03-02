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
    inviteId?: string;
  };

  if (!body.razorpay_order_id || !body.razorpay_payment_id || !body.razorpay_signature) {
    return NextResponse.json(
      { error: "Razorpay payment data required" },
      { status: 400 },
    );
  }

  if (!body.inviteId) {
    return NextResponse.json(
      { error: "Invite ID required" },
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
        { status: 402 },
      );
    }

    const dbPayment = await getPaymentByRazorpayOrder(body.razorpay_order_id);
    if (dbPayment) {
      await updatePaymentStatus(dbPayment.id, "completed");
      await updatePaymentRazorpayId(dbPayment.id, body.razorpay_payment_id);
    }

    await unlockInviteById(body.inviteId, session.user.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Unlock] Invite unlock error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}
