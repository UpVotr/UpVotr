import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const tags = new Table(
  getTableName(tables.tags),
  [
    {
      name: "tagId",
      type: "TINYINT",
      notNull: true
    },
    {
      name: "postId",
      type: "BIGINT",
      notNull: true
    }
  ] as const,
  "PRIMARY KEY (`tagId`, `postId`)"
);

export const tagDefinitions = new Table(
  getTableName(tables.tagDefinitions),
  [
    {
      name: "tagId",
      type: "TINYINT",
      notNull: true
    },
    {
      name: "backgroundColor",
      type: "CHAR(8)"
    },
    {
      name: "textColor",
      type: "CHAR(8)"
    },
    {
      name: "displayName",
      type: "CHAR(100)",
      notNull: true
    }
  ] as const,
  "PRIMARY KEY(`tagId`)"
);
