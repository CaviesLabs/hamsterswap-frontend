import { User } from "firebase/auth";
import { put, call } from "redux-saga/effects";
import { setUser } from "../../actions/user/user.action";
import { SagaPayload } from "@/src/redux/entities";
import { proposalService } from "@/src/redux/saga/proposal/proposal.service";

/**
 * @param callback
 * @description
 * Fetch proposals data
 */
export function* listProposal({ callback }: SagaPayload<unknown, User>) {
  try {
    const profile: User = yield call(proposalService.listProposal);
    yield put(setUser(profile));
    callback && callback(profile);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
