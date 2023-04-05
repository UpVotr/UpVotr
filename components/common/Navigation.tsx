import Image from "next/image";
import style from "./Navigation.module.scss";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "../../app/redux/store";
import Link from "next/link";
import { useCurrentSessionQuery } from "../../app/redux/rtk/sessionAPI";

const AccountGroup: React.FC = () => {
  const { t } = useTranslation("common");
  const sessionQuery = useCurrentSessionQuery();

  return (
    <div className={style.AccountGroup}>
      {sessionQuery.isLoading ||
      sessionQuery.isFetching ||
      sessionQuery.isUninitialized ? (
        <div className={style.Loader}>
          <div />
          <div />
          <div />
        </div>
      ) : sessionQuery.isError || !sessionQuery.isSuccess ? (
        <div className={style.Error} />
      ) : sessionQuery.data.loggedIn ? (
        <div />
      ) : (
        <a className={style.Login} href="/u/login">
          {t("navigation.login")}
        </a>
      )}
    </div>
  );
};

const Navigation: React.FC = () => {
  const { t } = useTranslation("common");
  const appTitle = useAppSelector((store) => store.settings.appTitle);
  return (
    <nav id="navigation" className={style.Container}>
      <div className={style.Content}>
        <Link href="/" className={style.AppLogo}>
          <Image
            src="/icon.png"
            height={32}
            width={32}
            alt={t("navigation.icon-alt", {
              appTitle
            })}
          />
          <h1 className={style.AppTitle}>{appTitle}</h1>
        </Link>
        <AccountGroup />
      </div>
    </nav>
  );
};

export default Navigation;
