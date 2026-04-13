import { relations } from "drizzle-orm";
import { jsonb, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { platform } from "@/lib/platform";

const createTable = pgTableCreator((name) => `${platform.dbTablePrefix}_${name}`);

export const savedFreeCard = createTable("saved_free_card", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  cardType: text("card_type").notNull(), // business, wedding, engagement, etc.
  cardTitle: text("card_title").notNull(),
  cardData: jsonb("card_data").$type<Record<string, string>>().notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const savedFreeCardRelations = relations(savedFreeCard, ({ one }) => ({
  user: one(user, { fields: [savedFreeCard.userId], references: [user.id] }),
}));
