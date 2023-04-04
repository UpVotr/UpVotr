import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ClientSettings {
  dark: boolean;
  loadedTheme: boolean;
}

const initialState: ClientSettings = {
  dark: false,
  loadedTheme: false
};

export const clientSettingsSlice = createSlice({
  name: "clientSettings",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.dark = action.payload === "dark";
      localStorage.setItem("theme", action.payload);
    },
    loadTheme(state) {
      const savedTheme = window.localStorage.getItem("theme");
      state.dark = savedTheme
        ? savedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      state.loadedTheme = true;
    }
  }
});

export const { setTheme, loadTheme } = clientSettingsSlice.actions;
