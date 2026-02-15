import { pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

const createTable = pgTableCreator((name) => `cardora_${name}`);

export const passwordResetToken = createTable("password_reset_token", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});
