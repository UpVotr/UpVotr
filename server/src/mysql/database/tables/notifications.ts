import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const notifications = new Table(
  getTableName(tables.notifications),
  [
    {
      name: "notificationId",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`notificationId` VARCHAR(36) CHARACTER SET utf8mb3 DEFAULT (UUID())"
    },
    {
      name: "targetUser",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`targetUser` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "priority",
      type: "TINYINT UNSIGNED",
      notNull: true
    },
    {
      name: "type",
      type: "TINYINT UNSIGNED",
      notNull: true
    },
    {
      name: "read",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
    },
    {
      name: "sent",
      type: "TIMESTAMP",
      notNull: true,
      default: "CURRENT_TIMESTAMP"
    },
    {
      name: "post",
      type: "BIGINT",
      notNull: true
    },
    {
      name: "comment",
      type: "MEDIUMINT UNSIGNED"
    },
    {
      name: "causedBy",
      type: "VARCHAR(36)",
      notNull: true,
      raw: "`causedBy` VARCHAR(36) CHARACTER SET utf8mb3"
    },
    {
      name: "detailState",
      type: "VARCHAR(300)"
    }
  ] as const,
  "PRIMARY KEY `notificationId`"
);
