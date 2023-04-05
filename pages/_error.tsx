import { useTranslation } from "next-i18next";
import { getServerSidePropsWrapper } from "../app/lib/getServerSideProps";
import style from "./_error.module.scss";

export const getServerSideProps = getServerSidePropsWrapper(
  async (store, ctx) => {
    return {
      props: {
        statusCode: ctx.res.statusCode
      }
    };
  },
  ["common", "error"]
);

const Error: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  const { t } = useTranslation("error");
  return (
    <div className={style.Codewrapper}>
      <h1 className={style.Code}>{statusCode}</h1>
      <p className={style.Message}>
        {t(
          [400, 401, 403, 404, 500].includes(statusCode)
            ? statusCode.toString()
            : "unknown"
        )}
      </p>
    </div>
  );
};

export default Error;
