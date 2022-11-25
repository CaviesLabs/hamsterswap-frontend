import { createContext, useContext } from "react";

/** @dev Export state contained in page interface */
export interface ProfilePageContextState {}

/** @dev Create context */
export const ProfilePageContext = createContext<ProfilePageContextState>({});

/** @dev Export use context function */
export const useProfilePage = () => {
  const context = useContext(ProfilePageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
