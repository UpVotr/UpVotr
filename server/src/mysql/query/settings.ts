import { PersistManager, Runner, createModule } from "@upvotr/node-hmr";
import { settings } from "../database/tables/settings";
import { QueryGenerator } from "./queryGenerator";
import { Settings } from "./types";

const settingsQueries = createModule(
  new PersistManager(),
  new Runner(() => {
    const getSettings = ((
      columns: Parameters<(typeof settings)["column"]>[0][]
    ) => [
      /* sql */ `SELECT ${columns
        .map((col) => settings.column(col))
        .join(", ")} FROM ${settings}`,
      []
    ]) satisfies QueryGenerator;

    type SettingKey = Parameters<(typeof settings)["column"]>[0];

    type SettingsType<K extends readonly SettingKey[]> = K extends [
      infer S extends SettingKey,
      ...infer Rest extends SettingKey[]
    ]
      ? [Settings[S], ...SettingsType<Rest>]
      : K extends [infer S extends SettingKey]
      ? Settings[S]
      : [];

    const setSettings = (<T extends readonly SettingKey[]>(
      cols: T,
      values: SettingsType<T>
    ) => [
      /* sql */ `UPDATE ${settings} SET ${cols
        .map((col) => `${settings.column(col)} = ?`)
        .join(", ")}`,
      [...values]
    ]) satisfies QueryGenerator;

    return {
      getSettings,
      setSettings
    };
  }),
  false
);

export = settingsQueries;
