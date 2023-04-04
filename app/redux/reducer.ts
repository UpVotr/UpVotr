import { combineReducers } from "redux";
import { settingsSlice } from "./slices/settingsSlice";
import { clientSettingsSlice } from "./slices/clientSettings";

export const reducer = combineReducers({
  [settingsSlice.name]: settingsSlice.reducer,
  [clientSettingsSlice.name]: clientSettingsSlice.reducer
});
