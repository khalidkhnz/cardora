import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { getCardById, updateCard, deleteCard, isCardSlugTaken } from "@/server/db/queries/card";
import { updateCardSettingsSchema } from "@/lib/validators";
import { z } from "zod";

const updateCardSchema = updateCardSettingsSchema.extend({
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens")
    .optional(),
  name: z.string().max(100).optional().nullable(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId } = await params;
  const card = await getCardById(cardId, session.user.id);

  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId } = await params;
  const body: unknown = await request.json();
  const parsed = updateCardSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // If changing slug, check uniqueness
  if (parsed.data.slug) {
    const taken = await isCardSlugTaken(session.user.id, parsed.data.slug, cardId);
    if (taken) {
      return NextResponse.json(
        { error: "You already have a card with this slug" },
        { status: 409 },
      );
    }
  }

  const card = await updateCard(cardId, session.user.id, parsed.data);
  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json(card);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { cardId } = await params;

  // Prevent deleting the default card
  const card = await getCardById(cardId, session.user.id);
  if (!card) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }
  if (card.isDefault) {
    return NextResponse.json(
      { error: "Cannot delete the default card" },
      { status: 400 },
    );
  }

  await deleteCard(cardId, session.user.id);
  return NextResponse.json({ success: true });
}
