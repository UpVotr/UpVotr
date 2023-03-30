import { Table } from "@upvotr/mysql-query-builder";
import { sessions } from "..//database/tables/sessions";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

export type Session = Table.RowType<typeof sessions>;

export type SessionRow = Session & RowDataPacket;

export const getSessionById = ((id: string) => [
  `SELECT ${sessions.column("userId")}, ${sessions.column(
    "expires"
  )} FROM ${sessions} WHERE ${sessions.column("sessionId")} = ?`,
  [id]
]) satisfies QueryGenerator;

export const setSessionById = ((
  id: string,
  userId: string,
  expires: Date,
  loggedIn?: boolean
) => [
  `INSERT INTO ${sessions} (${sessions.column("userId")}, ${sessions.column(
    "expires"
  )}, ${sessions.column("sessionId")}) VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE ${sessions.column(
    "userId"
  )} = VALUES(userId), ${sessions.column("expires")} = VALUES(expires)`,
  [userId, loggedIn ?? null, expires, id]
]) satisfies QueryGenerator;

export const touchSession: QueryGenerator = ((id: string) => [
  `UPDATE ${sessions} SET ${sessions.column(
    "expires"
  )} = CURRENT_TIMESTAMP WHERE ${sessions.column("sessionId")} = ?`,
  [id]
]) satisfies QueryGenerator;

export const destroySessionById = ((id: string) => [
  `DELETE FROM ${sessions} WHERE ${sessions.column("sessionId")} = ?`,
  [id]
]) satisfies QueryGenerator;

export const getSessionCount = (() => [
  `SELECT COUNT(${sessions.column(
    "sessionId"
  )}) AS \`count\` FROM ${sessions} WHERE ${sessions.column(
    "expires"
  )} < CURRENT_TIMESTAMP`,
  []
]) satisfies QueryGenerator;

export const getAllSessions = (() => [
  `SELECT ${sessions.column("userId")}, ${sessions.column(
    "expires"
  )}, ${sessions.column("sessionId")} FROM ${sessions} WHERE ${sessions.column(
    "expires"
  )} < CURRENT_TIMESTAMP`,
  []
]) satisfies QueryGenerator;

export const clearAllSessions: QueryGenerator = (() => [
  `DELETE FROM ${sessions}`,
  []
]) satisfies QueryGenerator;
