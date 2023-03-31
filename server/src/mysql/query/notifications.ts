import { Runner, createModule } from "@upvotr/node-hmr";
import { notifications } from "../database/tables/notifications";
import { QueryGenerator } from "./queryGenerator";
import { PersistManager } from "@upvotr/node-hmr/build/esm/persistManager";

const notificationQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const createNotification = ((
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

    const markRead = ((notificationId: string) => [
      /* sql */ `UPDATE ${notifications} SET ${notifications.column(
        "read"
      )} = TRUE WHERE ${notifications.column("notificationId")} = ?`,
      [notificationId]
    ]) satisfies QueryGenerator;

    const deleteNotification = ((notificationId: string) => [
      /* sql */ `DELETE FROM ${notifications} WHERE ${notifications.column(
        "notificationId"
      )} = ?`,
      [notificationId]
    ]) satisfies QueryGenerator;

    const getUserNotificationsInRange = ((
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

    const markAllReadForUser = ((userId: string) => [
      /* sql */ `UPDATE ${notifications} SET ${notifications.column(
        "read"
      )} = TRUE WHERE ${notifications.column("targetUser")} = ?`,
      [userId]
    ]) satisfies QueryGenerator;

    const deleteAllForUser = ((userId: string) => [
      /* sql */ `DELETE FROM ${notifications} WHERE ${notifications.column(
        "targetUser"
      )} = ?`,
      [userId]
    ]) satisfies QueryGenerator;

    return {
      createNotification,
      markRead,
      deleteNotification,
      getUserNotificationsInRange,
      markAllReadForUser,
      deleteAllForUser
    };
  }),
  false
);

export = notificationQueries;
