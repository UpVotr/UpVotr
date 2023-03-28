import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const roles = new Table(
  getTableName(tables.roles),
  [
    {
      name: "userId",
      type: "BINARY(16)" as "BINARY",
      notNull: true
    },
    {
      name: "roleId",
      type: "TINYINT",
      notNull: true
    }
  ] as const,
  "PRIMARY KEY (`userId`, `roleId`)"
);

export const roleDefinitions = new Table(
  getTableName(tables.roleDefinitions),
  [
    {
      name: "roleId",
      type: "TINYINT",
      notNull: true
    },
    {
      name: "roleName",
      type: "VARCHAR(100)",
      notNull: true
    },
    {
      name: "permissionFlags",
      type: "TINYINT",
      notNull: true,
      default: "0",
      raw: "`permissionFlags` TINYINT(8) ZEROFILL NOT NULL DEFAULT 0"
    }
  ] as const,
  "PRIMARY KEY (`roleId`)"
);
