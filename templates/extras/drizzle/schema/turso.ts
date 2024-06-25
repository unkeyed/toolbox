import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `${name}`);

export const posts = createTable(
  "post",
  {
    id: int("id", { mode: "number" })
      .primaryKey({ autoIncrement: true })
      .notNull(),
    title: text("title", { length: 256 }).notNull(),
    post: text("post", { length: 256 }).notNull(),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);
