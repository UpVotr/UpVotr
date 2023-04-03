import { query } from "../connection";
import { SettingsRow } from "../../query/types";
import { getSettings } from "../../query/settings";

export function getAppSettings() {
  return query<SettingsRow[]>(...getSettings(["appTitle", "accentColor"]));
}
