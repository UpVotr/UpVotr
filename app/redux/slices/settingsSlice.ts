import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Settings } from "@query/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: Omit<Settings, "key" | "postsPublicByDefault"> = {
  appTitle: "UpVotr Feedback",
  accentColor: "DB2777"
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setAccent(state, action: PayloadAction<string>) {
      state.accentColor = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.appTitle = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE](state, action: PayloadAction<{ settings: typeof initialState }>) {
      return {
        appTitle: action.payload.settings.appTitle,
        accentColor: action.payload.settings.accentColor
      };
    }
  }
});

const settingsReducer = settingsSlice.reducer;

export default settingsReducer;

export const { setAccent, setTitle } = settingsSlice.actions;
