import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import {
  buildImageKey,
  uploadToS3,
  deleteFromS3,
  listUserFiles,
  isOwnedByUser,
} from "@/lib/s3";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const type = formData.get("type") as string | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: jpeg, png, gif, webp" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum 5MB" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const key = buildImageKey(session.user.id, ext);
  const buffer = Buffer.from(await file.arrayBuffer());

  const url = await uploadToS3({ key, body: buffer, contentType: file.type });

  // Delete old image if replacing
  const oldUrl = formData.get("oldUrl") as string | null;
  if (oldUrl) {
    await deleteFromS3(oldUrl);
  }

  return NextResponse.json({
    url,
    filename: key.split("/").pop()!,
    type: type ?? "general",
    size: file.size,
  });
}

export async function DELETE(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL required" },
      { status: 400 },
    );
  }

  if (!isOwnedByUser(imageUrl, session.user.id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await deleteFromS3(imageUrl);

  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = await listUserFiles(`uploads/images/${session.user.id}/`);

  const userFiles = files.map((f) => ({
    url: f.url,
    filename: f.key.split("/").pop()!,
  }));

  return NextResponse.json(userFiles);
}
