import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { createInvite } from "@/server/db/queries/wedding";
import { createWeddingInviteSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json();
  const parsed = createWeddingInviteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const invite = await createInvite(session.user.id, parsed.data);
    return NextResponse.json(invite);
  } catch (error) {
    // Handle unique slug constraint violation
    if (error instanceof Error && error.message.includes("unique")) {
      return NextResponse.json(
        { error: "An invite with this slug already exists" },
        { status: 409 },
      );
    }
    throw error;
  }
}
