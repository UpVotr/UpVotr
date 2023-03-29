import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

const upvotrVersion = {
  major: 0,
  minor: 1,
  bugFix: 0
};

export const version = new Table(
  getTableName(tables.version),
  [
    {
      name: "key",
      type: "BOOLEAN",
      notNull: true,
      default: "FALSE"
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
