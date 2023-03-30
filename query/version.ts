import { Table } from "@upvotr/mysql-query-builder";
import { version } from "../server/src/mysql/model/database/tables/version";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

type Version = Table.RowType<typeof version>;

export type VersionRow = Version & RowDataPacket;

export const getVersion = (() => [
  `SELECT ${version.column("major")}, ${version.column(
    "minor"
  )}, ${version.column("bugFix")} FROM ${version}`,
  []
]) satisfies QueryGenerator;

export const setVersion = ((major: number, minor: number, bugFix: number) => [
  `UPDATE ${version} SET ${version.column("major")} = ?, ${version.column(
    "minor"
  )} = ?, ${version.column("bugFix")} = ?`,
  [major, minor, bugFix]
]) satisfies QueryGenerator;
