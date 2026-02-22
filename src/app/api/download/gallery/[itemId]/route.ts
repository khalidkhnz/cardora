import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { deleteGalleryItem } from "@/server/db/queries/gallery";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> },
) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;
  const result = await deleteGalleryItem(itemId, session.user.id);

  if (!result) {
    return NextResponse.json(
      { error: "Gallery item not found or unauthorized" },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true });
}
