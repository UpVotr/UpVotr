import { posts } from "../server/src/mysql/database/tables/posts";
import { QueryGenerator } from "./queryGenerator";

export const createPost = ((
  title: string,
  content: string,
  authorId: string
) => [
  /* sql */ `INSERT INTO ${posts} (${posts.column("title")}, ${posts.column(
    "content"
  )}, ${posts.column("authorId")}) VALUES(?, ?, ?)`,
  [title, content, authorId]
]) satisfies QueryGenerator;

export const deletePost = ((postId: string, deletedBy: string) => [
  /* sql */ `UPDATE ${posts} SET ${posts.column(
    "deleted"
  )} = TRUE, ${posts.column("deletedBy")} = ? WHERE ${posts.column(
    "postId"
  )} = ?`,
  [deletedBy, postId]
]) satisfies QueryGenerator;

export const updatePost = ((
  postId: string,
  editedBy: string,
  title?: string,
  content?: string
) => [
  /* sql */ `UPDATE ${posts} SET ${(
    ["title", "content"] as Parameters<(typeof posts)["column"]>[0][]
  )
    .map((col) => `${posts.column(col)} = COALESCE(?, ${posts.column(col)})`)
    .join(", ")}, ${posts.column("editedBy")} = ? WHERE ${posts.column(
    "postId"
  )} = ? `,
  [title ?? null, content ?? null, editedBy, postId]
]) satisfies QueryGenerator;

export const setPostVisibility = ((postId: string, isPublic: boolean) => [
  /* sql */ `UPDATE ${posts} SET ${posts.column(
    "public"
  )} = ? WHERE ${posts.column("postId")} = ?`,
  [isPublic, postId]
]) satisfies QueryGenerator;

export const setPostResolveComment = ((postId: string, commentId: number) => [
  /* sql */ `UPDATE ${posts} SET ${posts.column(
    "resolvedBy"
  )} = ? WHERE ${posts.column("postId")} = ?`,
  [commentId, postId]
]) satisfies QueryGenerator;

export const setPostStatus = ((postId: string, status: number) => [
  /* sql */ `UPDATE ${posts} SET ${posts.column(
    "status"
  )} = ? WHERE ${posts.column("postId")} = ?`,
  [status, postId]
]) satisfies QueryGenerator;
