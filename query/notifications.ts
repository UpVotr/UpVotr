import { Table } from "@upvotr/mysql-query-builder";
import { notifications } from "../server/src/mysql/database/tables/notifications";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

export type Notification = Table.RowType<typeof notifications>;

export type NotificationRow = Notification & RowDataPacket;

export const createNotification = ((
  targetUser: string,
  type: number,
  post: string,
  causedBy: string,
  comment?: number,
  priority: number = 0,
  detailState?: string
) => [
  `INSERT INTO ${notifications} (${notifications.column(
    "targetUser"
  )}, ${notifications.column("type")}, ${notifications.column(
    "post"
  )}, ${notifications.column("comment")}, ${notifications.column(
    "priority"
  )}, ${notifications.column("detailState")}) VALUES(?, ?, ?, ?, ?, ?)`,
  [targetUser, type, post, comment ?? null, priority, detailState ?? null]
]) satisfies QueryGenerator;

export const markRead = ((notificationId: string) => [
  `UPDATE ${notifications} SET ${notifications.column(
    "read"
  )} = TRUE WHERE ${notifications.column("notificationId")} = ?`,
  [notificationId]
]) satisfies QueryGenerator;

export const deleteNotification = ((notificationId: string) => [
  `DELETE FROM ${notifications} WHERE ${notifications.column(
    "notificationId"
  )} = ?`,
  [notificationId]
]) satisfies QueryGenerator;

export const getUserNotificationsInRange = ((
  userId: string,
  offset: number,
  count: number
) => [
  `SELECT ${(
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
  `UPDATE ${notifications} SET ${notifications.column(
    "read"
  )} = TRUE WHERE ${notifications.column("targetUser")} = ?`,
  [userId]
]) satisfies QueryGenerator;

export const deleteAllForUser = ((userId: string) => [
  `DELETE FROM ${notifications} WHERE ${notifications.column(
    "targetUser"
  )} = ?`,
  [userId]
]) satisfies QueryGenerator;
