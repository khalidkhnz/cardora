import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getApiSession } from "@/server/auth-helpers";
import { saveCard, getUserSavedCards } from "@/server/db/queries/saved-card";

const saveCardSchema = z.object({
  cardType: z.string().min(1),
  cardTitle: z.string().min(1),
  cardData: z.record(z.string()),
});

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cards = await getUserSavedCards(session.user.id);
  return NextResponse.json({ data: cards });
}

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody: unknown = await request.json();
  const parsed = saveCardSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const card = await saveCard({
    userId: session.user.id,
    ...parsed.data,
  });

  return NextResponse.json({ data: card }, { status: 201 });
}
