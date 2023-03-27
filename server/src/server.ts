import HMRRuntime, { HotModule } from "@upvotr/node-hmr";
import express from "express";
import next from "next";
import type { NextServer } from "next/dist/server/next";
import { ContentWatcher } from "./dev/contentWatcher";

const serverModule: HotModule<
  {
    nextApp: NextServer;
    expressApp: Express.Application;
    runtime: HMRRuntime;
  },
  void
> = {
  async getPersistentValues() {
    const dev = process.env.NODE_ENV === "development";
    const runtime = new HMRRuntime(dev && new ContentWatcher(require), require);
    const nextApp = next({ dev, quiet: true, customServer: true });
    const expressApp = express();

    return {
      nextApp,
      expressApp,
      runtime
    };
  },
  async cleanupPersistentValues(persistentValues) {},
  run() {},
  cleanup() {}
};
