import { relations } from "drizzle-orm";
import { integer, jsonb, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { platform } from "@/lib/platform";

const createTable = pgTableCreator((name) => `${platform.dbTablePrefix}_${name}`);

export const payment = createTable("payment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  recipientId: text("recipient_id").references(() => user.id, {
    onDelete: "cascade",
  }),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("INR"),
  paymentMethod: text("payment_method").$type<"razorpay" | "interac">().notNull(),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  status: text("status")
    .$type<"pending" | "completed" | "failed" | "refunded">()
    .default("pending")
    .notNull(),
  purpose: text("purpose")
    .$type<
      | "card_unlock"
      | "business_card"
      | "invite_unlock"
      | "animated_invite"
      | "cart_checkout"
      | "payment"
    >()
    .notNull(),
  inviteId: text("invite_id"),
  payerEmail: text("payer_email"),
  itemData: jsonb("item_data").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const paymentRelations = relations(payment, ({ one }) => ({
  user: one(user, {
    fields: [payment.userId],
    references: [user.id],
    relationName: "paymentUser",
  }),
  recipient: one(user, {
    fields: [payment.recipientId],
    references: [user.id],
    relationName: "paymentRecipient",
  }),
}));
