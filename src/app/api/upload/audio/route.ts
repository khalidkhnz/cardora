import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

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
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const filename = `${session.user.id}-audio-${timestamp}-${random}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  const filePath = join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  // Delete old audio if provided
  const oldUrl = formData.get("oldUrl") as string | null;
  if (oldUrl) {
    const oldFilename = oldUrl.split("/").pop();
    if (oldFilename) {
      const oldPath = join(uploadDir, oldFilename);
      await unlink(oldPath).catch(() => {
        /* file may not exist */
      });
    }
  }

  const url = `/uploads/${filename}`;

  return NextResponse.json({
    url,
    filename,
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

  const filename = audioUrl.split("/").pop();
  if (!filename?.startsWith(session.user.id)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const uploadDir = join(process.cwd(), "public", "uploads");
  const filePath = join(uploadDir, filename);
  await unlink(filePath).catch(() => {
    /* file may not exist */
  });

  return NextResponse.json({ success: true });
}
