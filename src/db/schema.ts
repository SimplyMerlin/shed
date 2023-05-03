import { mysqlEnum, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";

export const resource = mysqlTable("resource", {
  id: varchar("id", { length: 191 }).primaryKey(),
  ownerId: text("ownerId").notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const resourceDownload = mysqlTable("resource_download", {
  id: varchar("id", { length: 191 }).primaryKey(),
  resourceId: varchar("resourceId", { length: 191 }),
  url: text("url").notNull(),
  type: mysqlEnum("type", ["external", "local"]).notNull(),
});
