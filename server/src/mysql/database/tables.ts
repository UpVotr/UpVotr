import { config } from "../../../loadedConfig";
import deepDefault from "../../../util/deepDefault";
import keymirror from "../../../util/keymirror";

export const tables = keymirror([
  "posts",
  "users",
  "sessions",
  "roles",
  "roleDefinitions",
  "tags",
  "tagDefinitions",
  "comments",
  "webhooks",
  "version"
]);

const tableNames = deepDefault(tables, config.mysql.database.tableMap);

/**
 *
 * @param name Original table name
 * @returns The modified table name (types as the same as the original name for use with `Database` from the query builder)
 */
export const getTableName = <K extends keyof typeof tables>(name: K): K => {
  return tableNames[name] as K;
};
