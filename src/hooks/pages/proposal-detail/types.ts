import { createContext, useContext } from "react";

/** @dev Export state contained in page interface */
export interface ProposalPageContextState {}

/** @dev Create context */
export const ProposalPageContext =
  createContext<ProposalPageContextState>(null);

/** @dev Export use context function */
export const useDashboardPage = () => {
  const context = useContext(ProposalPageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
