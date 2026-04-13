import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { deleteSavedCard } from "@/server/db/queries/saved-card";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteSavedCard(id, session.user.id);

  if (!deleted) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
