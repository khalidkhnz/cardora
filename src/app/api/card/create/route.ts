import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { createCard, isCardSlugTaken } from "@/server/db/queries/card";
import { createCardSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = createCardSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Check slug uniqueness for this user
  const taken = await isCardSlugTaken(session.user.id, parsed.data.slug);
  if (taken) {
    return NextResponse.json(
      { error: "You already have a card with this slug" },
      { status: 409 },
    );
  }

  const card = await createCard(session.user.id, parsed.data);
  return NextResponse.json(card);
}
