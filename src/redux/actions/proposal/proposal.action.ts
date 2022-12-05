import {
  SET_PROPOSALS,
  GET_PROPSALS,
  SET_PROPSALS,
  GET_EXPLORE_PROPOSALS,
} from "@/src/redux/actions";
import { ProposalItem } from "@/src/components/user/types";
import { CallBackSaga } from "@/src/redux/entities";
import {
  GetProposalsDto,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";

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

/**
 * @param {GetProposalsDto} data
 * @returns reducer.
 */
export const getPropsals = (data: GetProposalsDto) => ({
  type: GET_PROPSALS,
  payload: data,
});

/**
 * @param {SwapProposalEntity[]} data
 * @returns reducer.
 */
export const setProposals = (data: SwapProposalEntity[]) => ({
  type: SET_PROPSALS,
  payload: data,
});

/**
 * @returns reducer.
 */
export const getExploreProposals = (
  callback?: CallBackSaga<SwapProposalEntity[]>
) => ({
  type: GET_EXPLORE_PROPOSALS,
  callback,
});
