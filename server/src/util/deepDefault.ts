import { DeepRequired } from "./deepRequired";
import fs from "fs";

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

export default function deepDefault<T extends Record<string | symbol, any>>(
  defaultObj: DeepRequired<T>,
  value: T
): DeepRequired<T> {
  return new Proxy<T>(value, new DeepDefault(defaultObj)) as DeepRequired<T>;
}
