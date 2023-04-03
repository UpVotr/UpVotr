import { version } from "../database/tables/version";
import { QueryGenerator } from "./queryGenerator";

export const getVersion = (() => [
  /* sql */ `SELECT ${version.column("major")}, ${version.column(
    "minor"
  )}, ${version.column("bugFix")} FROM ${version}`,
  []
]) satisfies QueryGenerator;

export const setVersion = ((major: number, minor: number, bugFix: number) => [
  /* sql */ `UPDATE ${version} SET ${version.column(
    "major"
  )} = ?, ${version.column("minor")} = ?, ${version.column("bugFix")} = ?`,
  [major, minor, bugFix]
]) satisfies QueryGenerator;
