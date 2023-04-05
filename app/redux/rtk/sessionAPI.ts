import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Session {
  loggedIn: boolean;
  userId?: string;
  displayName?: string;
  avatarURL?: string;
}

export const sessionAPISlice = createApi({
  reducerPath: "sessionAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/u" }),
  endpoints(build) {
    return {
      currentSession: build.query<Session, void>({
        query: () => "/session"
      })
    };
  }
});

export const { useCurrentSessionQuery } = sessionAPISlice;
