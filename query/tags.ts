import { tagDefinitions, tags } from "../server/src/mysql/database/tables/tags";
import { QueryGenerator } from "./queryGenerator";

export const addTagToPost = ((tagId: number, postId: string) => [
  /* sql */ `INSERT IGNORE INTO ${tags} (${tags.column("tagId")}, ${tags.column(
    "postId"
  )}) VALUES(?, ?)`,
  [tagId, postId]
]) satisfies QueryGenerator;

export const removeTagFromPost = ((tagId: number, postId: string) => [
  /* sql */ `DELETE FROM ${tags} WHERE ${tags.column(
    "tagId"
  )} = ? AND ${tags.column("postId")} = ?`,
  [tagId, postId]
]) satisfies QueryGenerator;

export const removeAllOfTag = ((tagId: number) => [
  /* sql */ `DELETE FROM ${tags} WHERE ${tags.column("tagId")} = ?`,
  [tagId]
]) satisfies QueryGenerator;

export const defineTag = ((
  displayName: string,
  backgroundColor?: string,
  textColor?: string
) => [
  /* sql */ `INSERT INTO ${tagDefinitions} (${tagDefinitions.column(
    "displayName"
  )}, ${tagDefinitions.column("backgroundColor")}, ${tagDefinitions.column(
    "textColor"
  )}) VALUES(?, ?, ?)`,
  [displayName, backgroundColor ?? null, textColor ?? null]
]) satisfies QueryGenerator;

export const updateTag = ((
  tagId: number,
  displayName?: string,
  backgroundColor?: string,
  textColor?: string
) => [
  /* sql */ `UPDATE ${tagDefinitions} SET ${tagDefinitions.column(
    "displayName"
  )} = COALESCE(?, ${tagDefinitions.column(
    "displayName"
  )}), ${tagDefinitions.column(
    "backgroundColor"
  )} = COALESCE(?, ${tagDefinitions.column(
    "backgroundColor"
  )}), ${tagDefinitions.column(
    "textColor"
  )} = COALESCE(?, ${tagDefinitions.column(
    "textColor"
  )}) WHERE ${tagDefinitions.column("tagId")} = ?`,
  [displayName ?? null, backgroundColor ?? null, textColor ?? null, tagId]
]) satisfies QueryGenerator;

export const removeTag = ((tagId: number) => [
  /* sql */ `DELETE FROM ${tagDefinitions} WHERE ${tagDefinitions.column(
    "tagId"
  )} = ?`,
  [tagId]
]) satisfies QueryGenerator;
