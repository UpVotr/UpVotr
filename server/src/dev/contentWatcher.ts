import { Watcher } from "@upvotr/node-hmr";
import { watch } from "fs";
import { readFile } from "fs/promises";
import md5 from "md5";

/**
 * File watcher for `@upvotr/node-hmr` that only updates if a file's content has changed.
 */
export class ContentWatcher extends Watcher {
  constructor(private require: NodeJS.Require) {
    super();
  }

  watch(id: string): () => void {
    // Typescript still emits unchanged files, causing the change event to fire.

    // Save the md5 signature of the file from the last time it was changed
    let previousMd5: string;
    // timeout to prevent double even emitting
    let timeout: NodeJS.Timeout;
    // The absolute file path of the requested module
    const resolvedPath = this.require.resolve(id);
    // Watch the file for changes
    const watcher = watch(resolvedPath, "utf-8", (e) => {
      // We only need to listen to change events
      if (e === "change") {
        // Clear the previous timeout if it has not already finished
        clearTimeout(timeout);
        // set the new timeout to read the file and check for changes
        setTimeout(async () => {
          // file buffer
          const content = await readFile(resolvedPath);
          const currentMd5 = md5(content, {
            asString: true
          });

          if (currentMd5 !== previousMd5) {
            this.emit("update", id);
            // Save the md5 for future comparisons
            previousMd5 = currentMd5;
          }
        }, 100);
      }
    });

    return () => watcher.close();
  }
}
