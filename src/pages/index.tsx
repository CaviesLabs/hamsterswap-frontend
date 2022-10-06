import type { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@/src/redux/actions/user/user.action";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getUser((user) => {
        console.log("Username", user?.name);
      })
    );
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className="text-3xl font-bold text-center text-black">Home Page</h1>
      </div>
    </MainLayout>
  );
};

export default Home;
