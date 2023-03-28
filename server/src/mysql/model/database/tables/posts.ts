import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const posts = new Table(
  getTableName(tables.posts),
  [
    {
      name: "title",
      type: "CHAR(100)",
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
      type: "CHAR(36)",
      notNull: true,
      raw: "`authorId` CHAR(36) CHARACTER SET utf8mb3 NOT NULL"
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
