import {
  SET_PROPOSAL,
  SET_PROPOSALS,
  GET_PROPOSAL,
  GET_PROPOSALS,
  GET_EXPLORE_PROPOSALS,
} from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";
import {
  GetProposalsDto,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { DetailDto } from "@/src/dto/detail.dto";

/**
 * @param proposals
 * @returns
 * @description
 * Update proposal list in redux state
 */
export const setProposal = (data: SwapProposalEntity) => ({
  type: SET_PROPOSAL,
  payload: data,
});

/**
 * @param {GetProposalsDto} data
 * @returns reducer.
 */
export const getPropsals = (data: GetProposalsDto) => ({
  type: GET_PROPOSALS,
  payload: data,
});

/**
 * @param {SwapProposalEntity[]} data
 * @returns reducer.
 */
export const setProposals = (data: SwapProposalEntity[]) => ({
  type: SET_PROPOSALS,
  payload: data,
});

/**
 * @returns reducer.
 */
export const getExploreProposals = (
  getListProposalDto?: GetProposalsDto,
  callback?: CallBackSaga<SwapProposalEntity[]>
) => ({
  type: GET_EXPLORE_PROPOSALS,
  payload: getListProposalDto,
  callback,
});

/**
 * GET proposal detail
 * @returns.
 */
export const getProposal = (
  payload?: DetailDto,
  callback?: CallBackSaga<SwapProposalEntity>
) => ({
  type: GET_PROPOSAL,
  payload,
  callback,
});
