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
  },
  posts: {
    publicByDefault: true
  }
};

if (!fs.existsSync("./upvotr.config.json")) {
  fs.writeFileSync("./upvotr.config.json", "{}");
}

const fileConfig: UpVotrConfig = JSON.parse(
  fs.readFileSync("./upvotr.config.json", "utf-8")
);

let updateTimeout: NodeJS.Timeout;
fs.watch("./upvotr.config.json", "utf-8", (e) => {
  if (e === "change") {
    clearTimeout(updateTimeout);
    setTimeout(() => {
      fs.readFile("./upvotr.config.json", "utf-8", (err, data) => {
        if (err) throw err;
        for (const key in fileConfig) {
          delete (fileConfig as any)[key];
        }
        Object.assign(fileConfig, JSON.parse(data));
      });
    }, 100);
  }
});

class DeepDefault<T extends Record<string | symbol, any>>
  implements ProxyHandler<T>
{
  constructor(private defaultObject: T) {}

  get(target: T, p: string | symbol, receiver: any): any {
    if (p in target) {
      return typeof target[p] === "object"
        ? new Proxy(target[p], new DeepDefault(this.defaultObject[p]))
        : target[p];
    }

    return typeof this.defaultObject[p] === "object"
      ? new Proxy(this.defaultObject[p], new DeepDefault(this.defaultObject[p]))
      : this.defaultObject[p];
  }
}

export const config = deepDefault<UpVotrConfig>(defaultConfig, fileConfig);
