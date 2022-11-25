import { ReactNode } from "react";
import { ProfilePageContext } from "./types";

export const ProfilePageProvider = (props: { children: ReactNode }) => {
  return (
    <ProfilePageContext.Provider value={{}}>
      {props.children}
    </ProfilePageContext.Provider>
  );
};
