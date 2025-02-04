import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const notes = sqliteTable('notes', {
  title: text(),
  description: text(),
});
