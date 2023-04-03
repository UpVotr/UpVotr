import { GetServerSideProps } from "next";
import { AppStore, wrapper } from "../redux/store";
import { getAppSettings } from "./getAppSettings";
import { setAccent, setTitle } from "../redux/slices/settingsSlice";

export const getServerSidePropsWrapper = (
  func: (
    store: AppStore,
    context: Parameters<GetServerSideProps>[0]
  ) => ReturnType<GetServerSideProps> = async () => {
    return {
      props: {}
    };
  }
) =>
  wrapper.getServerSideProps((store) => async (ctx) => {
    const {
      result: [settings]
    } = await getAppSettings();
    store.dispatch(setTitle(settings.appTitle));
    store.dispatch(setAccent(settings.accentColor));
    return await func(store, ctx);
  });
