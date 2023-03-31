"use client";

import { AppProps } from "next/app";
import { wrapper } from "../app/redux/store";
import "./globals.css";
import { Provider } from "react-redux";

export default function RootLayout({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}
