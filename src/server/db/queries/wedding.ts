import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { weddingInvite } from "@/server/db/schema/wedding";
import type { CreateWeddingInviteInput } from "@/lib/validators";

export async function getWeddingInviteBySlug(slug: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.slug, slug))
    .limit(1);

  return results[0] ?? null;
}

export async function getCurrentUserInvite(userId: string) {
  const results = await db
    .select()
    .from(weddingInvite)
    .where(eq(weddingInvite.userId, userId))
    .limit(1);

  return results[0] ?? null;
}

export async function createOrUpdateInvite(
  userId: string,
  data: CreateWeddingInviteInput,
) {
  const existing = await getCurrentUserInvite(userId);

  if (existing) {
    const result = await db
      .update(weddingInvite)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(weddingInvite.userId, userId))
      .returning();

    return result[0]!;
  }

  const result = await db
    .insert(weddingInvite)
    .values({
      userId,
      ...data,
    })
    .returning();

  return result[0]!;
}
