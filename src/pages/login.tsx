import { FC } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { Button } from "@hamsterbox/ui-kit";
import { LoginPageProvider, useLoginPage } from "@/src/hooks/pages/login";

const Layout: FC = () => {
  const { handleLogin } = useLoginPage();

  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className="text-3xl font-bold text-center text-black">
          Login Page
        </h1>
        <Button text="Login" onClick={handleLogin} />
      </div>
    </MainLayout>
  );
};

const LoginPage: NextPage = () => {
  return (
    <LoginPageProvider>
      <Layout />
    </LoginPageProvider>
  );
};

export default LoginPage;
