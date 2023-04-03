import type { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { UpVotrConfig } from "../server/src/config";
import deepDefault from "../server/src/util/deepDefault";
import { DeepRequired } from "../server/src/util/deepRequired";
import fileConfig from "../upvotr.config.json";
import { createPool } from "mysql2/promise";

const defaultConfig: DeepRequired<UpVotrConfig> = {
  server: {
    hostname: "localhost",
    port: 3000
  },
  mysql: {
    database: {
      name: "upvotr",
      tableMap: {}
    },
    login: {
      user: "",
      password: ""
    },
    autoconfigure: true,
    connection: {
      connectionLimit: 10,
      host: "127.0.0.1"
    }
  }
};

const config = deepDefault<UpVotrConfig>(defaultConfig, fileConfig);

export const db = createPool({
  host: config.mysql.connection.host,
  connectionLimit: config.mysql.connection.connectionLimit,
  user: config.mysql.login.user,
  password: config.mysql.login.password,
  multipleStatements: true,
  database: config.mysql.database.name
});

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
