import { createContext, useContext } from "react";

/** @dev Export state contained in page interface */
export interface MainContextState {
  openNftDetailModal(): void;
}

/** @dev Create context */
export const MainContext = createContext<MainContextState>(null);

/** @dev Export use context function */
export const useMain = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
