import { SET_PROPOSALS } from "@/src/redux/actions";
import { ProposalReducer } from "@/src/components/user/types";

/**
 * @param proposals
 * @returns
 * @description
 * Update proposal list in redux state
 */
export const setProposal = (data: ProposalReducer) => ({
  type: SET_PROPOSALS,
  payload: data,
});
