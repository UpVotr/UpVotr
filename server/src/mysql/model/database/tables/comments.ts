import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const comments = new Table(
  getTableName(tables.comments),
  [
    {
      name: "postId",
      type: "BIGINT UNSIGNED",
      notNull: true
    },
    {
      name: "commentId",
      type: "MEDIUMINT UNSIGNED",
      notNull: true
    },
    {
      name: "authorId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`authorId` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "content",
      type: "TEXT",
      default: '""'
    },
    {
      name: "repliesTo",
      type: "MEDIUMINT UNSIGNED"
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
  "PRIMARY KEY (`postId`, `commentId`)"
);

export const commentAutoIncrementTrigger = `CREATE TRIGGER IF NOT EXISTS \`comment_increment_id\`
BEFORE INSERT ON ${comments}
FOR EACH ROW
BEGIN
  ${
    /* Stores the largest commentId. Something to consider later, however:
      If the most recent comment is deleted, the ID will be reused... */ ""
  }
  DECLARE lastId MEDIUMINT;

  SELECT COALESCE(MAX(commentId), 0) INTO lastId
  FROM ${comments}
  WHERE ${comments.column("postId")} = NEW.postId;

  SET NEW.commentId = lastId + 1;
END`;

export const commentOnUpdateTrigger = `CREATE TRIGGER IF NOT EXISTS \`comment_update\`
BEFORE UPDATE ON ${comments}
FOR EACH ROW
BEGIN
  IF NEW.deleted = TRUE AND OLD.deleted = FALSE THEN
    SET NEW.content = "";
  END IF;
  SET NEW.lastEdit = CURRENT_TIMESTAMP;
END`;
