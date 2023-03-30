import { Table } from "@upvotr/mysql-query-builder";
import { settings } from "../database/tables/settings";
import { RowDataPacket } from "mysql2";
import { QueryGenerator } from "./queryGenerator";

export type Settings = Table.RowType<typeof settings>;
export type SettingsRow = Settings & RowDataPacket;

export const getSettings = ((
  columns: Parameters<(typeof settings)["column"]>[0][]
) => [
  `SELECT ${columns
    .map((col) => settings.column(col))
    .join(", ")} FROM ${settings}`,
  []
]) satisfies QueryGenerator;

export const setSettings = (<
  T extends Parameters<(typeof settings)["column"]>[0]
>(
  cols: T[],
  values: Settings[T][]
) => [
  `UPDATE ${settings} SET ${cols
    .map((col) => `${settings.column(col)} = ?`)
    .join(", ")}`,
  values
]) satisfies QueryGenerator;
