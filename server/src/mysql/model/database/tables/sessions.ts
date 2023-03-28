import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const sessions = new Table(
  getTableName(tables.sessions),
  [
    {
      name: "loggedIn",
      type: "BOOLEAN",
      default: "FALSE"
    },
    {
      name: "userId",
      type: "CHAR(36)",
      notNull: true,
      raw: "`userId` CHAR(36) CHARACTER SET utf8mb3 NOT NULL"
    },
    {
      name: "sessionId",
      type: "CHAR(32)",
      notNull: true
    },
    {
      name: "expires",
      type: "TIMESTAMP",
      notNull: true
    }
  ] as const,
  "PRIMARY KEY(`sid`)"
);
