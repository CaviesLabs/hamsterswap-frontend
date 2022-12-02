import { SET_PROPOSALS } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { ProposalItem } from "@/src/components/user/types";

export default (state: ProposalItem = null, action: Action) => {
  if (action.type === SET_PROPOSALS) {
    return action.payload;
  }
  return state;
};
