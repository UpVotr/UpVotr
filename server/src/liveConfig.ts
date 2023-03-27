import { UpVotrConfig } from "./config";
import fs from "fs";

const defaultConfig: Required<UpVotrConfig> = {
  server: {
    hostname: "localhost",
    port: 3000
  }
};

if (!fs.existsSync("./upvotr.config.json")) {
  fs.writeFileSync("./upvotr.config.json", "{}");
}

console.log("config:", fs.readFileSync("./upvotr.config.json", "utf-8"));

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
  constructor(private defaultObject: T, private path: string = "") {}

  get(target: T, p: string | symbol, receiver: any): any {
    if (p in target) {
      return typeof target[p] === "object"
        ? new Proxy(
            target[p],
            new DeepDefault(
              this.defaultObject[p],
              `${this.path}.${p.toString()}`
            )
          )
        : target[p];
    }

    return typeof this.defaultObject[p] === "object"
      ? new Proxy(
          this.defaultObject[p],
          new DeepDefault(this.defaultObject[p], `${this.path}.${p.toString()}`)
        )
      : this.defaultObject[p];
  }

  set(target: T, p: string | symbol, newValue: any, receiver: any): boolean {
    const set = Reflect.set(target, p, newValue, receiver);
    if (this.path === "") {
      fs.writeFile("./upvotr.config.json", JSON.stringify(target), () => {});
    }
    return set;
  }
}

export const liveConfig = () =>
  new Proxy<UpVotrConfig>(
    fileConfig || {},
    new DeepDefault(defaultConfig)
  ) as Required<UpVotrConfig>;
