import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const users = new Table(
  getTableName(tables.users),
  [
    {
      name: "userId",
      type: "CHAR(36)",
      notNull: true,
      raw: "`userId` CHAR(36) CHARACTER SET utf8mb3 NOT NULL"
    },
    {
      name: "authProvider",
      type: "TINYINT",
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
      type: "CHAR(100)",
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
    }
  ] as const,
  "PRIMARY KEY(`userId`)"
);
