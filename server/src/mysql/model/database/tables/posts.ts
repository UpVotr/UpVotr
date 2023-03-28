import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

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
      type: "BINARY(16)" as "BINARY",
      notNull: true
    },
    {
      name: "lastEdit",
      type: "TIMESTAMP"
    },
    {
      name: "postId",
      type: "BIGINT",
      notNull: true,
      raw: "`postId` BIGINT UNSIGNED AUTO_INCREMENT"
    },
    {
      name: "resolvedBy",
      type: "MEDIUMINT"
    },
    {
      name: "status",
      type: "TINYINT",
      notNull: true,
      default: "0"
    }
  ] as const,
  "PRIMARY KEY (`postId`)"
);

export const postOnUpdateTrigger = `CREATE TRIGGER IF NOT EXISTS \`post_update\`
BEFORE UPDATE ON ${posts.aliasedName()}
FOR EACH ROW
BEGIN
  SET NEW.lastEdit = CURRENT_TIMESTAMP;
END`;
