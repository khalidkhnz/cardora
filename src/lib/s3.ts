import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { env } from "@/env";

/**
 * Cache the S3 client in development to survive HMR, same pattern as db/index.ts.
 */
const globalForS3 = globalThis as unknown as {
  s3Client: S3Client | undefined;
};

const s3Client =
  globalForS3.s3Client ??
  new S3Client({
    region: env.AWS_S3_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

if (env.NODE_ENV !== "production") globalForS3.s3Client = s3Client;

// ---------------------------------------------------------------------------
// Key builders
// ---------------------------------------------------------------------------

export function buildImageKey(userId: string, ext: string): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 8);
  return `uploads/images/${userId}/${ts}-${rand}.${ext}`;
}

export function buildAudioKey(userId: string, ext: string): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 8);
  return `uploads/audio/${userId}/${ts}-${rand}.${ext}`;
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

export function getPublicUrl(key: string): string {
  if (env.AWS_S3_CDN_URL) {
    const base = env.AWS_S3_CDN_URL.replace(/\/$/, "");
    return `${base}/${key}`;
  }
  return `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_S3_REGION}.amazonaws.com/${key}`;
}

export function extractKeyFromUrl(url: string): string | null {
  // CDN URL
  if (env.AWS_S3_CDN_URL) {
    const base = env.AWS_S3_CDN_URL.replace(/\/$/, "");
    if (url.startsWith(base)) {
      return url.slice(base.length + 1);
    }
  }

  // S3 virtual-hosted URL
  const s3Prefix = `https://${env.AWS_S3_BUCKET}.s3.${env.AWS_S3_REGION}.amazonaws.com/`;
  if (url.startsWith(s3Prefix)) {
    return url.slice(s3Prefix.length);
  }

  // Legacy local URL (e.g. /uploads/...) — not an S3 key
  return null;
}

export function isOwnedByUser(url: string, userId: string): boolean {
  const key = extractKeyFromUrl(url);
  if (!key) return false;
  return key.includes(`/${userId}/`);
}

// ---------------------------------------------------------------------------
// S3 operations
// ---------------------------------------------------------------------------

export async function uploadToS3({
  key,
  body,
  contentType,
}: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: env.AWS_S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );
  return getPublicUrl(key);
}

export async function deleteFromS3(url: string): Promise<void> {
  const key = extractKeyFromUrl(url);
  if (!key) return; // legacy local URL — skip silently

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
      }),
    );
  } catch {
    // Silently ignore delete errors (file may already be gone)
  }
}

export async function listUserFiles(
  prefix: string,
): Promise<{ key: string; url: string; lastModified?: Date }[]> {
  const result = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: env.AWS_S3_BUCKET,
      Prefix: prefix,
    }),
  );

  return (result.Contents ?? []).map((obj) => ({
    key: obj.Key!,
    url: getPublicUrl(obj.Key!),
    lastModified: obj.LastModified,
  }));
}
