import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppStore, wrapper } from "../redux/store";
import { getAppSettings } from "./getAppSettings";
import { loadSettings } from "../redux/slices/settingsSlice";

export const getServerSidePropsWrapper = (
  func: (
    store: AppStore,
    context: Parameters<GetServerSideProps>[0]
  ) => ReturnType<GetServerSideProps> = async () => {
    return {
      props: {}
    };
  },
  translations: string[] = ["common"]
) =>
  wrapper.getServerSideProps((store) => async (ctx) => {
    const {
      result: [settings]
    } = await getAppSettings();
    store.dispatch(loadSettings(settings));
    const res = await func(store, ctx);

    return {
      ...res,
      props: {
        ...("props" in res ? res.props : {}),
        ...(await serverSideTranslations(ctx.locale!, translations))
      }
    };
  });
