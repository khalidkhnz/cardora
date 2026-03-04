import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import {
  buildAudioKey,
  uploadToS3,
  deleteFromS3,
  isOwnedByUser,
} from "@/lib/s3";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/m4a",
  "audio/aac",
  "audio/x-m4a",
  "audio/mp4",
];

export async function POST(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: mp3, wav, ogg, m4a, aac" },
      { status: 400 },
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum 10MB" },
      { status: 400 },
    );
  }

  const ext = file.name.split(".").pop() ?? "mp3";
  const key = buildAudioKey(session.user.id, ext);
  const buffer = Buffer.from(await file.arrayBuffer());

  const url = await uploadToS3({ key, body: buffer, contentType: file.type });

  // Delete old audio if replacing
  const oldUrl = formData.get("oldUrl") as string | null;
  if (oldUrl) {
    await deleteFromS3(oldUrl);
  }

  return NextResponse.json({
    url,
    filename: key.split("/").pop()!,
    size: file.size,
  });
}

export async function DELETE(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get("url");

  if (!audioUrl) {
    return NextResponse.json(
      { error: "Audio URL required" },
      { status: 400 },
    );
  }

  if (!isOwnedByUser(audioUrl, session.user.id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await deleteFromS3(audioUrl);

  return NextResponse.json({ success: true });
}
