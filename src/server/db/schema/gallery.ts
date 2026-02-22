import { relations } from "drizzle-orm";
import { jsonb, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { platform } from "@/lib/platform";

const createTable = pgTableCreator((name) => `${platform.dbTablePrefix}_${name}`);

export const galleryItem = createTable("gallery_item", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text("type").$type<"business_card" | "wedding_invite">().notNull(),
  templateId: text("template_id").notNull(),
  slug: text("slug"),
  data: jsonb("data").$type<Record<string, unknown>>(),
  downloadedAt: timestamp("downloaded_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const galleryItemRelations = relations(galleryItem, ({ one }) => ({
  user: one(user, { fields: [galleryItem.userId], references: [user.id] }),
}));
