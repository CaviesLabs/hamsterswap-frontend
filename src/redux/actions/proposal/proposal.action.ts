import { SET_PROPOSALS } from "@/src/redux/actions";
import { ProposalItem } from "@/src/components/user/types";

/**
 * @param proposals
 * @returns
 * @description
 * Update proposal list in redux state
 */
export const setProposal = (data: ProposalItem) => ({
  type: SET_PROPOSALS,
  payload: data,
});
