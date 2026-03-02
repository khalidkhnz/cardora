import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { addToGallery } from "@/server/db/queries/gallery";

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    templateId: string;
    slug: string;
    data: Record<string, unknown>;
  };

  const item = await addToGallery(session.user.id, {
    type: "wedding_invite",
    templateId: body.templateId,
    slug: body.slug,
    data: body.data,
  });

  return NextResponse.json(item, { status: 201 });
}
