import HMRRuntime, {
  AsyncRunner,
  ExportType,
  PersistManager,
  createModule
} from "@upvotr/node-hmr";
import express from "express";
import next from "next";
import { ContentWatcher } from "./dev/contentWatcher";
import { config } from "./loadedConfig";
import chalk from "chalk";
import { appSession } from "./session";

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

      expressApp.use(appSession);

      expressApp.listen(serverConf.port, () => {
        console.log(
          chalk.hex("#ea580c")("[UpVotr]:"),
          `Ready on http://${serverConf.hostname}:${serverConf.port}`
        );
      });

      return {
        nextApp,
        expressApp,
        runtime,
        handle
      };
    },
    async () => {}
  ),
  new AsyncRunner(
    async ({ expressApp, handle, runtime }) => {
      const sessionRouter = await runtime.import<
        ExportType<typeof import("./routes/session")>
      >("./routes/session");
      expressApp.use("/u", (req, res, next) =>
        sessionRouter.exports ? sessionRouter.exports(req, res, next) : next()
      );
      expressApp.all("*", (req, res) => {
        return handle(req, res);
      });
    },
    ({ expressApp }) => {
      expressApp._router.stack = [];
    }
  ),
  false
);

export = serverModule;
