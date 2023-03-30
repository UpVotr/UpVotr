import { UpVotrConfig } from "./config";
import fs from "fs";
import { DeepRequired } from "./util/deepRequired";
import deepDefault from "./util/deepDefault";

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

if (!fs.existsSync(require.resolve("../../upvotr.config.json"))) {
  fs.writeFileSync(require.resolve("../../upvotr.config.json"), "{}");
}

const fileConfig: UpVotrConfig = JSON.parse(
  fs.readFileSync(require.resolve("../../upvotr.config.json"), "utf-8")
);

export const config = deepDefault<UpVotrConfig>(defaultConfig, fileConfig);
