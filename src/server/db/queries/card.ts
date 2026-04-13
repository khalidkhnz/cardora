import "server-only";
import { eq, and, sql, ne } from "drizzle-orm";
import { db } from "@/server/db";
import { cardSettings } from "@/server/db/schema/card";
import type { UpdateCardSettingsInput } from "@/lib/validators";

// ---------------------------------------------------------------------------
// Multi-card queries
// ---------------------------------------------------------------------------

export async function getUserCards(userId: string) {
  return db
    .select()
    .from(cardSettings)
    .where(eq(cardSettings.userId, userId))
    .orderBy(sql`${cardSettings.isDefault} desc, ${cardSettings.createdAt} desc`);
}

export async function getCardById(cardId: string, userId: string) {
  const results = await db
    .select()
    .from(cardSettings)
    .where(and(eq(cardSettings.id, cardId), eq(cardSettings.userId, userId)))
    .limit(1);

  return results[0] ?? null;
}

export async function getDefaultCard(userId: string) {
  // Try isDefault first, fall back to first card
  const results = await db
    .select()
    .from(cardSettings)
    .where(and(eq(cardSettings.userId, userId), eq(cardSettings.isDefault, true)))
    .limit(1);

  if (results[0]) return results[0];

  // Fallback: get any card
  const fallback = await db
    .select()
    .from(cardSettings)
    .where(eq(cardSettings.userId, userId))
    .orderBy(sql`${cardSettings.createdAt} asc`)
    .limit(1);

  return fallback[0] ?? null;
}

export async function getCardByUserAndSlug(userId: string, slug: string) {
  const results = await db
    .select()
    .from(cardSettings)
    .where(and(eq(cardSettings.userId, userId), eq(cardSettings.slug, slug)))
    .limit(1);

  return results[0] ?? null;
}

export async function createCard(
  userId: string,
  data: {
    slug: string;
    name?: string;
    cardType?: "business" | "wedding" | "engagement" | "anniversary";
  } & Partial<UpdateCardSettingsInput>,
) {
  // Check if user has any cards yet - if not, make this the default
  const existing = await db
    .select({ id: cardSettings.id })
    .from(cardSettings)
    .where(eq(cardSettings.userId, userId))
    .limit(1);

  const isFirst = !existing[0];

  const result = await db
    .insert(cardSettings)
    .values({
      userId,
      slug: data.slug,
      name: data.name,
      isDefault: isFirst,
      cardType: data.cardType ?? "business",
      collection: data.collection,
      selectedTemplateId: data.selectedTemplateId,
      orientation: data.orientation,
      cardSize: data.cardSize,
      weddingDate: data.weddingDate,
      venue: data.venue,
      brideName: data.brideName,
      groomName: data.groomName,
      brideParentNames: data.brideParentNames,
      groomParentNames: data.groomParentNames,
      deceasedElders: data.deceasedElders,
    })
    .returning();

  return result[0]!;
}

export async function updateCard(
  cardId: string,
  userId: string,
  data: UpdateCardSettingsInput & { slug?: string; name?: string | null },
) {
  const result = await db
    .update(cardSettings)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(cardSettings.id, cardId), eq(cardSettings.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function deleteCard(cardId: string, userId: string) {
  const card = await getCardById(cardId, userId);
  if (!card) return null;

  await db
    .delete(cardSettings)
    .where(and(eq(cardSettings.id, cardId), eq(cardSettings.userId, userId)));

  // If deleted card was default, promote the next one
  if (card.isDefault) {
    const next = await db
      .select()
      .from(cardSettings)
      .where(eq(cardSettings.userId, userId))
      .orderBy(sql`${cardSettings.createdAt} asc`)
      .limit(1);

    if (next[0]) {
      await db
        .update(cardSettings)
        .set({ isDefault: true, updatedAt: new Date() })
        .where(eq(cardSettings.id, next[0].id));
    }
  }

  return { success: true };
}

export async function setDefaultCard(cardId: string, userId: string) {
  // Unset all defaults for this user
  await db
    .update(cardSettings)
    .set({ isDefault: false, updatedAt: new Date() })
    .where(and(eq(cardSettings.userId, userId), eq(cardSettings.isDefault, true)));

  // Set the new default
  const result = await db
    .update(cardSettings)
    .set({ isDefault: true, updatedAt: new Date() })
    .where(and(eq(cardSettings.id, cardId), eq(cardSettings.userId, userId)))
    .returning();

  return result[0] ?? null;
}

export async function isCardSlugTaken(
  userId: string,
  slug: string,
  excludeCardId?: string,
) {
  const conditions = [eq(cardSettings.userId, userId), eq(cardSettings.slug, slug)];
  if (excludeCardId) {
    conditions.push(ne(cardSettings.id, excludeCardId));
  }

  const results = await db
    .select({ id: cardSettings.id })
    .from(cardSettings)
    .where(and(...conditions))
    .limit(1);

  return !!results[0];
}

// ---------------------------------------------------------------------------
// Backward-compat aliases
// ---------------------------------------------------------------------------

/** @deprecated Use getDefaultCard instead */
export async function getCardSettings(userId: string) {
  return getDefaultCard(userId);
}

/** @deprecated Use createCard instead */
export async function createCardSettings(userId: string) {
  // Create a default card with slug "default"
  return createCard(userId, { slug: "default", name: "My Card" });
}

/** @deprecated Use updateCard instead */
export async function updateCardSettings(
  userId: string,
  data: UpdateCardSettingsInput,
) {
  const existing = await getDefaultCard(userId);

  if (!existing) {
    return createCard(userId, { slug: "default", name: "My Card", ...data });
  }

  const result = await db
    .update(cardSettings)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(cardSettings.id, existing.id))
    .returning();

  return result[0]!;
}
