import { Table } from "@upvotr/mysql-query-builder";
import { getTableName, tables } from "../tables";

export const settings = new Table(
  getTableName(tables.settings),
  [
    {
      name: "key",
      type: "ENUM('settings')",
      notNull: true,
      default: "'settings'"
    },
    {
      name: "appTitle",
      type: "VARCHAR(150)",
      notNull: true,
      default: "'UpVotr Feedback'"
    },
    {
      name: "accentColor",
      type: "CHAR(6)",
      notNull: true,
      default: "'DB2777'"
    },
    {
      name: "postsPublicByDefault",
      type: "BOOLEAN",
      notNull: true,
      default: "TRUE"
    }
  ] as const,
  "PRIMARY KEY(`key`)"
);

export const initSettings = `INSERT IGNORE INTO ${settings}() VALUES()`;
