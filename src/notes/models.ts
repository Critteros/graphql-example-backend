import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notes = sqliteTable('notes', {
  uid: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  title: text().notNull(),
  description: text().notNull(),
});
