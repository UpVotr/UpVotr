import { sessions } from "../database/tables/sessions";
import { QueryGenerator } from "./queryGenerator";

export const getSessionById = ((id: string) => [
  /* sql */ `SELECT ${sessions.column("userId")}, ${sessions.column(
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
  /* sql */ `INSERT INTO ${sessions} (${sessions.column(
    "userId"
  )}, ${sessions.column("expires")}, ${sessions.column(
    "sessionId"
  )}) VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE ${sessions.column(
    "userId"
  )} = VALUES(userId), ${sessions.column("expires")} = VALUES(expires)`,
  [userId, loggedIn ?? null, expires, id]
]) satisfies QueryGenerator;

export const touchSession: QueryGenerator = ((id: string) => [
  /* sql */ `UPDATE ${sessions} SET ${sessions.column(
    "expires"
  )} = CURRENT_TIMESTAMP WHERE ${sessions.column("sessionId")} = ?`,
  [id]
]) satisfies QueryGenerator;

export const destroySessionById = ((id: string) => [
  /* sql */ `DELETE FROM ${sessions} WHERE ${sessions.column("sessionId")} = ?`,
  [id]
]) satisfies QueryGenerator;

export const getSessionCount = (() => [
  /* sql */ `SELECT COUNT(${sessions.column(
    "sessionId"
  )}) AS count FROM ${sessions} WHERE ${sessions.column(
    "expires"
  )} < CURRENT_TIMESTAMP`,
  []
]) satisfies QueryGenerator;

export const getAllSessions = (() => [
  /* sql */ `SELECT ${sessions.column("userId")}, ${sessions.column(
    "expires"
  )}, ${sessions.column("sessionId")} FROM ${sessions} WHERE ${sessions.column(
    "expires"
  )} < CURRENT_TIMESTAMP`,
  []
]) satisfies QueryGenerator;

export const clearAllSessions: QueryGenerator = (() => [
  /* sql */ `DELETE FROM ${sessions}`,
  []
]) satisfies QueryGenerator;
