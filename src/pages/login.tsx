import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import styles from "@/styles/Home.module.css";
import { Button, toast } from "@hamsterbox/ui-kit";

const LoginPage: NextPage = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <h1 className="text-3xl font-bold text-center text-black">
          Login Page
        </h1>
        <Button text="Login" onClick={() => toast("You clicked login")} />
      </div>
    </MainLayout>
  );
};

export default LoginPage;
