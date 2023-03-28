import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const comments = new Table(
  getTableName(tables.comments),
  [
    {
      name: "postId",
      type: "BIGINT",
      notNull: true
    },
    {
      name: "commentId",
      type: "MEDIUMINT",
      notNull: true
    },
    {
      name: "authorId",
      type: "CHAR(36)",
      notNull: true,
      raw: "`authorId` CHAR(36) CHARACTER SET utf8mb3 NOT NULL"
    },
    {
      name: "content",
      type: "TEXT",
      notNull: true
    },
    {
      name: "repliesTo",
      type: "MEDIUMINT"
    }
  ] as const,
  "PRIMARY KEY (`postId`, `commentId`)"
);

export const commentAutoIncrementTrigger = `CREATE TRIGGER IF NOT EXISTS \`increment_id\`
BEFORE INSERT ON ${comments.aliasedName()}
FOR EACH ROW
BEGIN
  ${
    /* Stores the largest commentId. Something to consider later, however:
      If the most recent comment is deleted, the ID will be reused... */ ""
  }
  DECLARE lastId MEDIUMINT;

  SELECT COALESCE(MAX(commentId), 0) INTO lastId
  FROM ${comments.aliasedName()}
  WHERE ${comments.column("postId")} = NEW.postId;

  SET NEW.commentId = lastId + 1;
END`;
