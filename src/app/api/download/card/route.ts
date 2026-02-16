import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { addToGallery, checkPaymentStatus } from "@/server/db/queries/gallery";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isPaid = await checkPaymentStatus(session.user.id, "card");
  if (!isPaid) {
    return NextResponse.json(
      { error: "Payment required to download card" },
      { status: 402 },
    );
  }

  const body = (await request.json()) as {
    templateId: string;
    data: Record<string, unknown>;
  };

  const item = await addToGallery(session.user.id, {
    type: "business_card",
    templateId: body.templateId,
    data: body.data,
  });

  return NextResponse.json(item, { status: 201 });
}
