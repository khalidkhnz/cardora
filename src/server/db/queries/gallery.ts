import "server-only";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { galleryItem } from "@/server/db/schema/gallery";

export async function getGalleryItems(
  userId: string,
  opts: { limit: number; offset: number } = { limit: 20, offset: 0 },
) {
  const [items, countResult] = await Promise.all([
    db
      .select()
      .from(galleryItem)
      .where(eq(galleryItem.userId, userId))
      .orderBy(galleryItem.downloadedAt)
      .limit(opts.limit)
      .offset(opts.offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(galleryItem)
      .where(eq(galleryItem.userId, userId)),
  ]);

  return {
    data: items,
    total: countResult[0]?.count ?? 0,
    limit: opts.limit,
    offset: opts.offset,
  };
}

export async function addToGallery(
  userId: string,
  data: {
    type: "business_card" | "wedding_invite";
    templateId: string;
    slug?: string;
    data: Record<string, unknown>;
  },
) {
  const result = await db
    .insert(galleryItem)
    .values({
      userId,
      type: data.type,
      templateId: data.templateId,
      slug: data.slug,
      data: data.data,
    })
    .returning();

  return result[0]!;
}

export async function deleteGalleryItem(itemId: string, userId: string) {
  const result = await db
    .delete(galleryItem)
    .where(and(eq(galleryItem.id, itemId), eq(galleryItem.userId, userId)))
    .returning({ id: galleryItem.id });

  return result[0] ?? null;
}
