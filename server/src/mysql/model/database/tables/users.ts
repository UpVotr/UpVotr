import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const users = new Table(
  getTableName(tables.users),
  [
    {
      name: "uuid",
      type: "BINARY",
      notNull: true,
      raw: "`uuid` BINARY(16) generated always as UUID_TO_BIN(`userId`) virtual"
    },
    {
      name: "userId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`userId` VARCHAR(36) CHARACTER SET utf8mb3"
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
    }
  ] as const,
  "PRIMARY KEY(`userId`)"
);

export const binaryUUIDFunction = `CREATE FUNCTION IF NOT EXISTS \`UUID_TO_BIN\` (v VARCHAR(36) CHARACTER SET utf8mb3)
RETURNS BINARY(16)
RETURN UNHEX(REPLACE(v,'-','')`;
