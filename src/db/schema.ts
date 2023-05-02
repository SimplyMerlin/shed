import { mysqlEnum, mysqlTable, text } from "drizzle-orm/mysql-core";

export const resource = mysqlTable("resource", {
  id: text("id").primaryKey(),
  ownerId: text("ownerId").notNull(),
  name: text("name").notNull(),
  description: text("description"),
});

export const resourceDownload = mysqlTable("resource_download", {
  id: text("id").primaryKey(),
  resourceId: text("resourceId").references(() => resource.id),
  url: text("url").notNull(),
  type: mysqlEnum("type", ["external", "local"]).notNull(),
});
