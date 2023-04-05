import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/store";
import style from "./Layout.module.scss";
import Navigation from "./Navigation";
import { Sora } from "next/font/google";
import { loadTheme } from "../../app/redux/slices/clientSettings";
import { useRouter } from "next/router";

const sora = Sora({ subsets: ["latin"] });

const rtlLangs: string[] = [];

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const appSettings = useAppSelector((store) => store.settings);
  const clientSettings = useAppSelector((store) => store.clientSettings);
  const dispatch = useAppDispatch();
  const { locale } = useRouter();

  useEffect(() => {
    if (!clientSettings.loadedTheme) dispatch(loadTheme());
  }, []);

  return (
    <div
      id="layout"
      style={
        {
          "--upvotr-accent": `#${appSettings.accentColor}`
        } as React.CSSProperties
      }
      className={`${sora.className} ${style.Wrapper} ${appSettings.theme} ${
        clientSettings.dark ? "dark" : "light"
      }${appSettings.accentOnNav ? " nav-accent" : ""}${
        rtlLangs.includes(locale!) ? " rtl" : ""
      }`}
    >
      <div className={style.Layout}>
        <div id="navigation-wrapper" className={style.Navigation}>
          <Navigation />
        </div>
        <div id="app-content" className={style.Content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
