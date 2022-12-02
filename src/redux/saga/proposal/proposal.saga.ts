import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { proposalService } from "@/src/redux/saga/proposal/proposal.service";
import { ProposalItem } from "@/src/components/user/types";
import { setProposal } from "@/src/redux/actions/proposal/proposal.action";
import { DetailDto } from "@/src/dto/detail.dto";

/**
 * @param callback
 * @description
 * Fetch proposals data
 */
export function* listProposal({
  callback,
}: SagaPayload<unknown, ProposalItem>) {
  try {
    const proposals: ProposalItem = yield call(proposalService.listProposal);
    yield put(setProposal(proposals));
    callback && callback(proposals);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}

/**
 * @param callback
 * @description
 * Fetch proposal data
 */
export function* getProposal({
  callback,
  payload,
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
