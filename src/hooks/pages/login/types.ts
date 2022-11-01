import { createContext, useContext } from "react";
import { ButtonLoginEvent } from "../types";

/** @dev Export state contained in page interface */
export interface LoginPageContextState {
  handleLogin: ButtonLoginEvent;
}

/** @dev Create context */
export const LoginPageContext = createContext<LoginPageContextState>(null);

/** @dev Export use context function */
export const useLoginPage = () => {
  const context = useContext(LoginPageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
