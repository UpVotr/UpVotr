import { Table } from "@upvotr/mysql-query-builder";
import { tagDefinitions, tags } from "../server/src/mysql/database/tables/tags";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

type Tag = Table.RowType<typeof tags>;

export type TagRow = Tag & RowDataPacket;

type TagDefinition = Table.RowType<typeof tagDefinitions>;

export type TagDefinitionRow = TagDefinition & RowDataPacket;

export const addTagToPost = ((tagId: number, postId: string) => [
  `INSERT IGNORE INTO ${tags} (${tags.column("tagId")}, ${tags.column(
    "postId"
  )}) VALUES(?, ?)`,
  [tagId, postId]
]) satisfies QueryGenerator;

export const removeTagFromPost = ((tagId: number, postId: string) => [
  `DELETE FROM ${tags} WHERE ${tags.column("tagId")} = ? AND ${tags.column(
    "postId"
  )} = ?`,
  [tagId, postId]
]) satisfies QueryGenerator;

export const removeAllOfTag = ((tagId: number) => [
  `DELETE FROM ${tags} WHERE ${tags.column("tagId")} = ?`,
  [tagId]
]) satisfies QueryGenerator;

export const defineTag = ((
  displayName: string,
  backgroundColor?: string,
  textColor?: string
) => [
  `INSERT INTO ${tagDefinitions} (${tagDefinitions.column(
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
  `UPDATE ${tagDefinitions} SET ${tagDefinitions.column(
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
  `DELETE FROM ${tagDefinitions} WHERE ${tagDefinitions.column("tagId")} = ?`,
  [tagId]
]) satisfies QueryGenerator;
