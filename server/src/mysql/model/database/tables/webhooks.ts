import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const webhooks = new Table(getTableName(tables.webhooks), [
  {
    name: "trigger",
    type: "TINYINT",
    notNull: true
  },
  {
    name: "url",
    type: "TEXT",
    notNull: true
  },
  {
    name: "webhookId",
    type: "SMALLINT UNSIGNED",
    notNull: true,
    raw: "`webhookId` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT"
  }
] as const);
