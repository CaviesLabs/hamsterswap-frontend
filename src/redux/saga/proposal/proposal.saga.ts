import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { proposalService } from "@/src/services/proposal.service";
import { ProposalItem } from "@/src/components/user/types";
import {
  setProposal,
  setProposals,
} from "@/src/redux/actions/proposal/proposal.action";
import { DetailDto } from "@/src/dto/detail.dto";
import {
  GetProposalsDto,
  SwapProposalEntity,
  SwapProposalStatus,
} from "@/src/entities/proposal.entity";

/**
 * @param callback
 * @description
 * Fetch proposal data
 */
export function* getProposal({
  payload,
  callback,
}: SagaPayload<DetailDto, ProposalItem>) {
  try {
    const proposal: ProposalItem = yield call(
      proposalService.getProposal,
      payload
    );
    yield put(setProposal(proposal));
    callback && callback(proposal);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}

/**
 * @dev Saga watcher for get proposal list.
 * @param {SagaPayload<GetProposalsDto, SwapProposalEntity[]>} saga payload
 */
export function* getListProposalByOwnerAddress({
  payload,
  callback,
}: SagaPayload<GetProposalsDto, SwapProposalEntity[]>) {
  try {
    /**
     * @dev Fetch proposal data from Hamster server.
     */
    const swapProposals: SwapProposalEntity[] = yield call(
      proposalService.getProposals,
      payload
    );

    /**
     * @dev Modify state in redux managment.
     */
    yield put(setProposals(swapProposals));

    callback && callback(swapProposals);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}

/**
 * @dev Saga watcher to explore proposals.
 * @param {SagaPayload<unkown, SwapProposalEntity[]>} saga payload
 */
export function* getExploreProposals({
  payload,
  callback,
}: SagaPayload<GetProposalsDto, SwapProposalEntity[]>) {
  try {
    /**
     * @dev Fetch proposal data from Hamster server.
     */
    const swapProposals: SwapProposalEntity[] = yield call(
      proposalService.getProposals,
      payload
    );
    yield put(setProposals(swapProposals));
    callback && callback(swapProposals);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
