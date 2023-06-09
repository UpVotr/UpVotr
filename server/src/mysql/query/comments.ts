import { comments } from "../database/tables/comments";
import { QueryGenerator } from "./queryGenerator";

export const addComment = ((
  postId: string,
  authorId: string,
  content: string,
  repliesTo?: number
) => [
  /* sql */ `INSERT INTO ${comments} (${comments.column(
    "postId"
  )}, ${comments.column("authorId")}, ${comments.column(
    "content"
  )}, ${comments.column("repliesTo")}) VALUES(?, ?, ?, ?)`,
  [postId, authorId, content, repliesTo ?? null]
]) satisfies QueryGenerator;

export const removeComment = ((
  postId: string,
  commentId: number,
  deletedBy: string
) => [
  // Truly deleteing the comment would be problematic for commentId creation
  // Also, we should really keep a record of deleted comments
  // Just in case it is needed as evidence.
  // however, we don't want to keep the comment's content
  // Just the fact that it was deleted.
  /* sql */ `UPDATE ${comments} SET ${comments.column(
    "deleted"
  )} = TRUE, ${comments.column("deletedBy")} = ? WHERE ${comments.column(
    "postId"
  )} = ? AND ${comments.column("commentId")} = ?`,
  [deletedBy, postId, commentId]
]) satisfies QueryGenerator;

export const editComment = ((
  postId: string,
  commentId: number,
  content: string,
  editor: string
) => [
  /* sql */ `UPDATE ${comments} SET ${comments.column(
    "content"
  )} = ?, ${comments.column("editedBy")} = ? WHERE ${comments.column(
    "postId"
  )} = ? AND ${comments.column("commentId")} = ?`,
  [content, editor, postId, commentId]
]) satisfies QueryGenerator;
