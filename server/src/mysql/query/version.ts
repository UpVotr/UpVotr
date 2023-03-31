import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { version } from "../database/tables/version";
import { QueryGenerator } from "./queryGenerator";

const versionQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const getVersion = (() => [
      /* sql */ `SELECT ${version.column("major")}, ${version.column(
        "minor"
      )}, ${version.column("bugFix")} FROM ${version}`,
      []
    ]) satisfies QueryGenerator;

    const setVersion = ((major: number, minor: number, bugFix: number) => [
      /* sql */ `UPDATE ${version} SET ${version.column(
        "major"
      )} = ?, ${version.column("minor")} = ?, ${version.column("bugFix")} = ?`,
      [major, minor, bugFix]
    ]) satisfies QueryGenerator;

    return {
      getVersion,
      setVersion
    };
  }),
  false
);
