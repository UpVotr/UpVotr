import HMRRuntime, {
  PersistManager,
  Runner,
  createModule
} from "@upvotr/node-hmr";
import express from "express";
import next from "next";
import { ContentWatcher } from "./dev/contentWatcher";
import { config } from "./loadedConfig";
import chalk from "chalk";

const serverModule = createModule(
  new PersistManager(
    async () => {
      const dev = process.env.NODE_ENV === "development";
      const runtime = new HMRRuntime(
        dev && new ContentWatcher(require),
        require
      );
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

      expressApp.listen(serverConf.port, () => {
        console.log(
          chalk.hex("#ea580c")("[UpVotr]:"),
          `Ready on http://${serverConf.hostname}:${serverConf.port}`
        );
      });

      return {
        nextApp,
        expressApp,
        runtime
      };
    },
    async () => {}
  ),
  new Runner(
    () => {},
    () => {}
  ),
  false
);

export = serverModule;
