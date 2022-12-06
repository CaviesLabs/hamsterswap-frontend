import { SET_PROPOSALS, SET_PROPSAL } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { ProposalDto } from "@/src/dto/proposal.dto";

/**
 * @dev List proposal by user.
 * @param {SwapProposalEntity} state
 * @param {Action} action
 */
export const proposalsReducer = (
  state: SwapProposalEntity[] = [],
  action: Action
) => {
  if (action.type === SET_PROPOSALS) {
    return action.payload;
  }
  return state;
};

/**
 * @dev Single proposal detail.
 * @param {ProposalDto} state
 * @param {Action} action
 */
export const proposalReducer = (state: ProposalDto = null, action: Action) => {
  if (action.type === SET_PROPSAL) {
    return action.payload;
  }
  return state;
};
