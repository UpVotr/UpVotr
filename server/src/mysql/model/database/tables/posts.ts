import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";
import { config } from "../../../../loadedConfig";

export const posts = new Table(
  getTableName(tables.posts),
  [
    {
      name: "title",
      type: "VARCHAR(100)",
      notNull: true
    },
    {
      name: "content",
      type: "MEDIUMTEXT",
      notNull: true
    },
    {
      name: "posted",
      type: "TIMESTAMP",
      notNull: true,
      default: "CURRENT_TIMESTAMP"
    },
    {
      name: "authorId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`authorId` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "lastEdit",
      type: "TIMESTAMP"
    },
    {
      name: "editedBy",
      type: "VARCHAR(36)",
      raw: "`editedBy` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "postId",
      type: "BIGINT UNSIGNED",
      notNull: true,
      raw: "`postId` BIGINT UNSIGNED AUTO_INCREMENT"
    },
    {
      name: "resolvedBy",
      type: "MEDIUMINT UNSIGNED"
    },
    {
      name: "status",
      type: "TINYINT UNSIGNED",
      notNull: true,
      default: "0"
    },
    {
      name: "public",
      type: "BOOLEAN",
      notNull: true,
      default: config.posts.publicByDefault ? "TRUE" : "FALSE"
    },
    {
      name: "deleted",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
    },
    {
      name: "deletedBy",
      type: "VARCHAR(36)",
      raw: "`deletedBy` VARCHAR(36) CHARACTER SET utf8mb3"
    }
  ] as const,
  "PRIMARY KEY (`postId`)"
);

export const postOnUpdateTrigger = `CREATE TRIGGER IF NOT EXISTS \`post_update\`
BEFORE UPDATE ON ${posts}
FOR EACH ROW
BEGIN
  SET NEW.lastEdit = CURRENT_TIMESTAMP;
END`;
