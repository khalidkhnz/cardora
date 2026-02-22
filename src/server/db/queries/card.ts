import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { cardSettings } from "@/server/db/schema/card";
import type { UpdateCardSettingsInput } from "@/lib/validators";

export async function getCardSettings(userId: string) {
  const results = await db
    .select()
    .from(cardSettings)
    .where(eq(cardSettings.userId, userId))
    .limit(1);

  return results[0] ?? null;
}

export async function createCardSettings(userId: string) {
  const result = await db
    .insert(cardSettings)
    .values({ userId })
    .returning();

  return result[0]!;
}

export async function updateCardSettings(
  userId: string,
  data: UpdateCardSettingsInput,
) {
  const existing = await getCardSettings(userId);

  if (!existing) {
    const result = await db
      .insert(cardSettings)
      .values({
        userId,
        ...data,
      })
      .returning();

    return result[0]!;
  }

  const result = await db
    .update(cardSettings)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(cardSettings.userId, userId))
    .returning();

  return result[0]!;
}
