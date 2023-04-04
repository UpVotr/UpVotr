import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Settings } from "@query/types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: Omit<Settings, "key" | "postsPublicByDefault"> = {
  appTitle: "UpVotr Feedback",
  accentColor: "FF54E2",
  theme: "zinc",
  accentOnNav: 0
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    loadSettings(state, action: PayloadAction<typeof initialState>) {
      Object.assign(state, action.payload);
    }
  },
  extraReducers: {
    [HYDRATE](state, action: PayloadAction<{ settings: typeof initialState }>) {
      return action.payload.settings;
    }
  }
});

export const { loadSettings } = settingsSlice.actions;
