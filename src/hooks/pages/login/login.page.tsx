import { ReactNode } from "react";
import { LoginPageContext } from "./types";
import { ButtonLoginEvent } from "../types";
import { toast } from "@hamsterbox/ui-kit";

export const LoginPageProvider = (props: { children: ReactNode }) => {
  const handleLogin: ButtonLoginEvent = (e) => {
    e.preventDefault();
    toast("Login");
  };

  return (
    <LoginPageContext.Provider value={{ handleLogin }}>
      {props.children}
    </LoginPageContext.Provider>
  );
};
