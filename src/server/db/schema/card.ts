import { relations } from "drizzle-orm";
import { boolean, pgTableCreator, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { platform } from "@/lib/platform";

const createTable = pgTableCreator((name) => `${platform.dbTablePrefix}_${name}`);

export const cardSettings = createTable(
  "card_settings",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name"),
    isDefault: boolean("is_default").default(false).notNull(),
    cardType: text("card_type")
      .$type<"business" | "wedding" | "engagement" | "anniversary">()
      .default("business"),
    collection: text("collection"),
    selectedTemplateId: text("selected_template_id"),
    orientation: text("orientation")
      .$type<"horizontal" | "vertical">()
      .default("horizontal"),
    cardSize: text("card_size")
      .$type<"standard" | "large">()
      .default("standard"),
    weddingDate: text("wedding_date"),
    venue: text("venue"),
    brideName: text("bride_name"),
    groomName: text("groom_name"),
    brideParentNames: text("bride_parent_names"),
    groomParentNames: text("groom_parent_names"),
    deceasedElders: text("deceased_elders"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [unique("card_user_slug_unique").on(table.userId, table.slug)],
);

export const cardSettingsRelations = relations(cardSettings, ({ one }) => ({
  user: one(user, { fields: [cardSettings.userId], references: [user.id] }),
}));
