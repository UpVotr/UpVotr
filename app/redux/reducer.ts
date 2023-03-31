import { combineReducers } from "redux";
import settingsReducer from "./slices/settingsSlice";

export const reducer = combineReducers({
  settings: settingsReducer
});
