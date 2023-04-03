import style from "./Layout.module.scss";
import Navigation from "./Navigation";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"] });

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div id="layout" className={`${sora.className} ${style.Layout}`}>
      <div id="navigation-wrapper" className={style.Navigation}>
        <Navigation />
      </div>
      <div id="app-content" className={style.Content}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
