import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { Router } from "express";

const settingsRouter = createModule(
  new PersistManager(),
  new Runner(() => {
    const router = Router();

    return router;
  }),
  false
);

export = settingsRouter;
