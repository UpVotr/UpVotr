import { AsyncRunner, HotModule } from "@upvotr/node-hmr";

export default function staticHMRImport<E>(m: HotModule<{}, E>): E {
  if (m.runner instanceof AsyncRunner)
    throw new Error("Cannot statically import Async Runner");

  return m.runner.execute({}, () => {});
}
