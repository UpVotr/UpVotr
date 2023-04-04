import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/store";
import style from "./Layout.module.scss";
import Navigation from "./Navigation";
import { Sora } from "next/font/google";
import { loadTheme } from "../../app/redux/slices/clientSettings";

const sora = Sora({ subsets: ["latin"] });

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useAppSelector((store) => store.settings.theme);
  const clientSettings = useAppSelector((store) => store.clientSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!clientSettings.loadedTheme) dispatch(loadTheme());
  }, []);

  return (
    <div
      id="layout"
      className={`${sora.className} ${style.Wrapper} ${theme} ${
        clientSettings.dark ? "dark" : "light"
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
