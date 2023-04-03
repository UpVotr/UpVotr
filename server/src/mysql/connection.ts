import {
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
  createPool
} from "mysql2/promise";
import { config } from "../loadedConfig";
import { setupDatabase } from "./database/database";
import createDebug from "debug";
import { handleMigrate } from "./migrate/handleMigrate";
import { Version, VersionRow } from "@query/types";
import { readFileSync } from "fs";
import { getVersion } from "@query/version";

const debug = createDebug("upvotr:database");

const currentVersion: Version = (([major, minor, bugFix]) => ({
  major,
  minor,
  bugFix,
  key: "version"
}))(
  JSON.parse(readFileSync(require.resolve("../../../package.json"), "utf-8"))
    .version.split(".")
    .map(Number)
);

const db = createPool({
  host: config.mysql.connection.host,
  connectionLimit: config.mysql.connection.connectionLimit,
  user: config.mysql.login.user,
  password: config.mysql.login.password,
  multipleStatements: true
});

export async function initDatabase() {
  try {
    await db.query(setupDatabase);
    if (config.mysql.autoconfigure) {
      try {
        debug("Attempting to automatically configure database...");
        await handleMigrate(
          (
            await query<VersionRow[]>(...getVersion())
          ).result[0],
          currentVersion
        );
      } catch (e) {
        debug("Failed to enter database...");
        console.error("Failed to automatically configure database.");
        throw e;
      }
    }
  } catch (e) {
    console.error("Failed to connect to database:", e);
    process.exit(1);
  }
}

export async function query<
  T extends
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader
>(sql: string, params: any[] = []) {
  const [result, fields] = await db.query<T>(sql, params);

  return {
    result,
    fields
  };
}

export async function execute<
  T extends RowDataPacket[] | OkPacket | ResultSetHeader
>(sql: string, params: any[] = []) {
  const [result, fields] = await db.execute<T>(sql, params);

  return {
    result,
    fields
  };
}
