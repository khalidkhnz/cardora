import "server-only";
import { eq, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { savedFreeCard } from "@/server/db/schema/saved-card";

export async function saveCard(data: {
  userId: string;
  cardType: string;
  cardTitle: string;
  cardData: Record<string, string>;
}) {
  const result = await db.insert(savedFreeCard).values(data).returning();
  return result[0]!;
}

export async function getUserSavedCards(userId: string) {
  return db
    .select()
    .from(savedFreeCard)
    .where(eq(savedFreeCard.userId, userId))
    .orderBy(sql`${savedFreeCard.createdAt} desc`);
}

export async function deleteSavedCard(id: string, userId: string) {
  const result = await db
    .delete(savedFreeCard)
    .where(
      sql`${savedFreeCard.id} = ${id} AND ${savedFreeCard.userId} = ${userId}`,
    )
    .returning();
  return result[0] ?? null;
}
