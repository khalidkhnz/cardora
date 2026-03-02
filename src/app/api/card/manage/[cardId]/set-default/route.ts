import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { setDefaultCard } from "@/server/db/queries/card";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId } = await params;
  const card = await setDefaultCard(cardId, session.user.id);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}
