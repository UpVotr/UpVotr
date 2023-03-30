import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const sessions = new Table(
  getTableName(tables.sessions),
  [
    {
      name: "userId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`userId` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "sessionId",
      type: "VARCHAR(32)",
      notNull: true
    },
    {
      name: "expires",
      type: "TIMESTAMP",
      notNull: true
    }
  ] as const,
  "PRIMARY KEY(`sessionId`)"
);

export const sessionsRemoveExpiredEvent = `CREATE EVENT IF NOT EXISTS
    \`sessions_clear_expired\`
  ON SCHEDULE EVERY 1 HOUR
  DO
    DELETE FROM ${sessions}
    WHERE ${sessions.column("expires")} < CURRENT_TIMESTAMP`;
