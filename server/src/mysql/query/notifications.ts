import { notifications } from "../database/tables/notifications";
import { QueryGenerator } from "./queryGenerator";

export const createNotification = ((
  targetUser: string,
  type: number,
  post: string,
  causedBy: string,
  comment?: number,
  priority: number = 0,
  detailState?: string
) => [
  /* sql */ `INSERT INTO ${notifications} (${notifications.column(
    "targetUser"
  )}, ${notifications.column("type")}, ${notifications.column(
    "post"
  )}, ${notifications.column("comment")}, ${notifications.column(
    "priority"
  )}, ${notifications.column("detailState")}) VALUES(?, ?, ?, ?, ?, ?)`,
  [targetUser, type, post, comment ?? null, priority, detailState ?? null]
]) satisfies QueryGenerator;

export const markRead = ((notificationId: string) => [
  /* sql */ `UPDATE ${notifications} SET ${notifications.column(
    "read"
  )} = TRUE WHERE ${notifications.column("notificationId")} = ?`,
  [notificationId]
]) satisfies QueryGenerator;

export const deleteNotification = ((notificationId: string) => [
  /* sql */ `DELETE FROM ${notifications} WHERE ${notifications.column(
    "notificationId"
  )} = ?`,
  [notificationId]
]) satisfies QueryGenerator;

export const getUserNotificationsInRange = ((
  userId: string,
  offset: number,
  count: number
) => [
  /* sql */ `SELECT ${(
    [
      "notificationId",
      "targetUser",
      "priority",
      "type",
      "read",
      "sent",
      "post",
      "comment",
      "causedBy",
      "detailState"
    ] as Parameters<(typeof notifications)["column"]>[0][]
  )
    .map((col) => notifications.column(col))
    .join(", ")} FROM ${notifications} WHERE ${notifications.column(
    "targetUser"
  )} = ? LIMIT ? OFFSET ?`,
  [userId, offset.toString(10), count.toString(10)]
]) satisfies QueryGenerator;

export const markAllReadForUser = ((userId: string) => [
  /* sql */ `UPDATE ${notifications} SET ${notifications.column(
    "read"
  )} = TRUE WHERE ${notifications.column("targetUser")} = ?`,
  [userId]
]) satisfies QueryGenerator;

export const deleteAllForUser = ((userId: string) => [
  /* sql */ `DELETE FROM ${notifications} WHERE ${notifications.column(
    "targetUser"
  )} = ?`,
  [userId]
]) satisfies QueryGenerator;
