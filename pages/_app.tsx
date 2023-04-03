"use client";

import { AppProps } from "next/app";
import { wrapper } from "../app/redux/store";
import "./globals.scss";
import { Provider } from "react-redux";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import Layout from "../components/common/Layout";

export default appWithTranslation(function App({
  Component,
  ...rest
}: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      </Provider>
    </>
  );
});
