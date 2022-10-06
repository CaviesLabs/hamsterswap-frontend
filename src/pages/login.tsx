import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";

const LoginPage: NextPage = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className="text-3xl font-bold text-center text-black">
          Login Page
        </h1>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
