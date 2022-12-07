import { ReactNode } from "react";
import { ProposalPageContext } from "./types";

export const ProposalDetailPageProvider = (props: { children: ReactNode }) => {
  return (
    <ProposalPageContext.Provider value={{}}>
      {props.children}
    </ProposalPageContext.Provider>
  );
};
