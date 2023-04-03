import Image from "next/image";
import style from "./Navigation.module.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/redux/store";

const Navigation: React.FC = () => {
  const { t } = useTranslation("common");
  const appTitle = useAppSelector((store) => store.settings.appTitle);
  return (
    <nav id="navigation" className={style.Container}>
      <div className={style.Content}>
        <div className={style.AppLogo}>
          <Image
            src="/icon.png"
            height={32}
            width={32}
            alt={t("navigation.icon-alt", {
              appTitle
            })}
          />
          <h1 className={style.AppTitle}>{appTitle}</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
