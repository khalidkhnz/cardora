import { NextResponse, type NextRequest } from "next/server";
import { getApiSession } from "@/server/auth-helpers";
import { writeFile, unlink, readdir } from "fs/promises";
import { join } from "path";

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
  const type = formData.get("type") as string | null; // profile, background, couple, card

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
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const filename = `${session.user.id}-${timestamp}-${random}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  const filePath = join(uploadDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  // If this is replacing an existing image (type=profile or type=background),
  // delete old file passed via form data
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

  const filename = imageUrl.split("/").pop();
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

export async function GET(request: NextRequest) {
  const session = await getApiSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uploadDir = join(process.cwd(), "public", "uploads");

  let files: string[];
  try {
    files = await readdir(uploadDir);
  } catch {
    files = [];
  }

  const userFiles = files
    .filter((f) => f.startsWith(session.user.id))
    .map((f) => ({
      url: `/uploads/${f}`,
      filename: f,
    }));

  return NextResponse.json(userFiles);
}
