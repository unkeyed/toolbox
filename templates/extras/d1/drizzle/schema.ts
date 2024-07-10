import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'increment' }).primaryKey(),
  title: text('title', { length: 256 }).notNull(),
  post: text('post', { length: 256 }).notNull(),
});

export type Post = {
  id: number;
  title: string;
  post: string;
};
