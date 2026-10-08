import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const publicInquiriesTable = pgTable("public_inquiries", {
  reference: text("reference").primaryKey(),
  fullName: text("full_name").notNull(),
  mobile: text("mobile").notNull(),
  category: text("category").notNull(),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull().defaultNow(),
});

export type PublicInquiry = typeof publicInquiriesTable.$inferSelect;
