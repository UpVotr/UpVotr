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
      type: "BINARY(16)" as "BINARY",
      notNull: true
    },
    {
      name: "content",
      type: "TEXT",
      default: '""'
    },
    {
      name: "repliesTo",
      type: "MEDIUMINT"
    },
    {
      name: "lastEdit",
      type: "TIMESTAMP"
    },
    {
      name: "deleted",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
    }
  ] as const,
  "PRIMARY KEY (`postId`, `commentId`)"
);

export const commentAutoIncrementTrigger = `CREATE TRIGGER IF NOT EXISTS \`comment_increment_id\`
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

export const commentOnUpdateTrigger = `CREATE TRIGGER IF NOT EXISTS \`comment_update\`
BEFORE UPDATE ON ${comments.aliasedName()}
FOR EACH ROW
BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    SET NEW.content = "";
  END IF;
  SET NEW.lastEdit = CURRENT_TIMESTAMP;
END`;
