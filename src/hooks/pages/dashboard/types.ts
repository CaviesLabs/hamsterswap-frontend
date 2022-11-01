import { createContext, useContext } from "react";

/** @dev Export state contained in page interface */
export interface DashboardPageContextState {}

/** @dev Create context */
export const DashboardPageContext = createContext<DashboardPageContextState>(
  {}
);

/** @dev Export use context function */
export const useDashboardPage = () => {
  const context = useContext(DashboardPageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
