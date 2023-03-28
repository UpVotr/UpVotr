import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const users = new Table(
  getTableName(tables.users),
  [
    {
      name: "userId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`userId` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "authProvider",
      type: "TINYINT UNSIGNED",
      notNull: true
    },
    {
      name: "tag",
      type: "INT",
      notNull: true,
      raw: "`tag` INT UNSIGNED AUTO_INCREMENT"
    },
    {
      name: "displayName",
      type: "VARCHAR(100)",
      notNull: true
    },
    {
      name: "anonymous",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
    },
    {
      name: "avatarURL",
      type: "TEXT",
      default: '"/assets/default_avatar.png"'
    },
    {
      name: "invisible",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
    },
    {
      name: "lastOnline",
      type: "TIMESTAMP",
      notNull: true,
      default: "CURRENT_TIMESTAMP"
    }
  ] as const,
  "PRIMARY KEY(`userId`)"
);
