import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const version = new Table(
  getTableName(tables.version),
  [
    {
      name: "key",
      type: "ENUM('version')",
      notNull: true,
      default: "'version'"
    },
    {
      name: "major",
      type: "TINYINT UNSIGNED",
      notNull: true,
      default: "0"
    },
    {
      name: "minor",
      type: "TINYINT UNSIGNED",
      notNull: true,
      default: "0"
    },
    {
      name: "bugFix",
      type: "TINYINT UNSIGNED",
      notNull: true,
      default: "0"
    }
  ] as const,
  "PRIMARY KEY (`key`)"
);

export const initVersion = `INSERT IGNORE INTO ${version}() VALUES()`;
