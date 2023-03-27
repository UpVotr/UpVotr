import HMRRuntime, { HotModule } from "@upvotr/node-hmr";
import express from "express";
import next from "next";
import type { NextServer } from "next/dist/server/next";
import { ContentWatcher } from "./dev/contentWatcher";
import { liveConfig } from "./liveConfig";

const serverModule: HotModule<
  {
    nextApp: NextServer;
    expressApp: Express.Application;
    runtime: HMRRuntime;
  },
  void
> = {
  async getPersistentValues() {
    const config = liveConfig();
    const dev = process.env.NODE_ENV === "development";
    const runtime = new HMRRuntime(dev && new ContentWatcher(require), require);
    const serverConf =
      "development" in config.server
        ? config.server[dev ? "development" : "production"]
        : config.server;
    const nextApp = next({
      dev,
      quiet: true,
      customServer: true,
      port: serverConf.port,
      hostname: serverConf.hostname
    });
    const handle = nextApp.getRequestHandler();
    await nextApp.prepare();
    const expressApp = express();

    expressApp.all("*", (req, res) => {
      return handle(req, res);
    });

    expressApp.listen(serverConf.port, () => {});

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

export = serverModule;
