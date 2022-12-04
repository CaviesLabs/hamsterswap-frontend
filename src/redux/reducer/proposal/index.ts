import { SET_PROPOSALS } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { ProposalReducer } from "@/src/components/user/types";

export default (state: ProposalReducer = null, action: Action) => {
  if (action.type === SET_PROPOSALS) {
    return action.payload;
  }
  return state;
};
