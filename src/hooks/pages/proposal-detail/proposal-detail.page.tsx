import { ReactNode } from "react";
import { ProposalPageContext } from "./types";

export const ProposalDetailPageProvider = (props: { children: ReactNode }) => {
  // const [offeredItem, setOfferedItem] = useState([]);

  /**
   * @dev Add offered item.
   */
  // const addOfferedItem = async

  return (
    <ProposalPageContext.Provider value={{}}>
      {props.children}
    </ProposalPageContext.Provider>
  );
};
