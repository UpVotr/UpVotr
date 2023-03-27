/*
  ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ This file is almost entirely here to start the HMR system and TS compiler                                       │
  │ The actual server code is in `./server.ts`                                                                      │
  └─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 */

import { HMRRuntime } from "@upvotr/node-hmr";
import WatchCompiler from "./dev/watchCompiler";
import { ContentWatcher } from "./dev/contentWatcher";
import createDebug from "debug";

const dev = process.env.NODE_ENV === "development";
// We don't need to watch the files in production...
if (dev) new WatchCompiler(["./server/", "tsconfig.json"]);

const runtime = new HMRRuntime(dev && new ContentWatcher(require), require);

const debug = createDebug("upvotr:server");

runtime.import("./server").then(() => {
  debug("Server initiated");
});
