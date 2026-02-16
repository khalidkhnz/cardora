import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getPaymentHistory } from "@/server/db/queries/payment";

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await getPaymentHistory(session.user.id);
  return NextResponse.json(payments);
}
