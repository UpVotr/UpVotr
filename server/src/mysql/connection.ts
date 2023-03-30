import {
  OkPacket,
  ResultSetHeader,
  RowDataPacket,
  createPool
} from "mysql2/promise";
import { config } from "../loadedConfig";
import { configureDatabase, database } from "./model/database/database";
import createDebug from "debug";

const debug = createDebug("upvotr:database");

const db = createPool({
  host: config.mysql.connection.host,
  connectionLimit: config.mysql.connection.connectionLimit,
  user: config.mysql.login.user,
  password: config.mysql.login.password,
  multipleStatements: true
});

export async function initDatabase() {
  try {
    if (config.mysql.autoconfigure) {
      try {
        debug("Attempting to automatically configure database...");
        await db.query(configureDatabase);
      } catch (e) {
        debug("Attempting to enter database...");
        console.error("Failed to automatically configure database.");
        throw e;
      }
    } else {
      await db.query(database.use());
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
