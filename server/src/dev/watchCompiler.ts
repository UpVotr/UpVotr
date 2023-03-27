import * as ts from "typescript";
import createDebug from "debug";

const debug = createDebug("upvotr:tscompiler");

/**
 * TypeScript watch compiler to update the source code.
 */
export default class WatchCompiler {
  formatHost: ts.FormatDiagnosticsHost;
  /**
   *
   * @param configPath The path to the file (either a complete string path or `[directory, filename]`)
   * @param createProgram TypeScript program builder to use. Defaults to `createEmitAndSemanticDiagnosticsBuilderProgram`
   */
  constructor(
    configPath: string | [string, string],
    createProgram: ts.CreateProgram<any> = ts.createEmitAndSemanticDiagnosticsBuilderProgram
  ) {
    this.formatHost = {
      getCanonicalFileName: (path) => path,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => ts.sys.newLine
    };

    debug("Checking for config...");
    const foundConfigPath = ts.findConfigFile(
      typeof configPath === "string" ? "." : configPath[0],
      ts.sys.fileExists,
      typeof configPath === "string" ? configPath : configPath[1]
    );

    if (!foundConfigPath) throw new ReferenceError("No config file found!");

    debug("Creating compiler host...");
    const host = ts.createWatchCompilerHost(
      foundConfigPath,
      {},
      ts.sys,
      createProgram,
      this.reportDiagnostic.bind(this),
      this.reportWatchStatusChanged.bind(this)
    );

    debug("Creating compiler...");
    ts.createWatchProgram(host);
  }

  reportDiagnostic(diagnostic: ts.Diagnostic) {
    debug(
      "ERR!",
      diagnostic.code,
      ":",
      ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        this.formatHost.getNewLine()
      )
    );
  }
  reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    debug(ts.formatDiagnostic(diagnostic, this.formatHost).trim());
  }
}
