import { ReactNode } from "react";
import { DashboardPageContext } from "./types";

export const DashboardPageProvider = (props: { children: ReactNode }) => {
  return (
    <DashboardPageContext.Provider value={{}}>
      {props.children}
    </DashboardPageContext.Provider>
  );
};
