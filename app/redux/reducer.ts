import { combineReducers } from "redux";
import { settingsSlice } from "./slices/settingsSlice";
import { clientSettingsSlice } from "./slices/clientSettings";
import { sessionAPISlice } from "./rtk/sessionAPI";

export const reducer = combineReducers({
  [settingsSlice.name]: settingsSlice.reducer,
  [clientSettingsSlice.name]: clientSettingsSlice.reducer,
  [sessionAPISlice.reducerPath]: sessionAPISlice.reducer
});

export const middleware = [sessionAPISlice.middleware];
