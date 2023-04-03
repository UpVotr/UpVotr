import style from "./page.module.scss";
import { NextPage } from "next";
import { getServerSidePropsWrapper } from "../app/lib/getServerSideProps";

export const getServerSideProps = getServerSidePropsWrapper();

const Home: NextPage = () => {
  return <main className={style.AppBody}></main>;
};

export default Home;
