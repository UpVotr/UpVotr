import { combineReducers } from "redux";
import { settingsSlice } from "./slices/settingsSlice";

export const reducer = combineReducers({
  [settingsSlice.name]: settingsSlice.reducer
});
