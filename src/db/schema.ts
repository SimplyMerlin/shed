import { mysqlTable, serial, text } from "drizzle-orm/mysql-core";

export const resource = mysqlTable("resource", {
  id: serial("id").primaryKey(),
  owner: text("owner"),
  name: text("name"),
});
