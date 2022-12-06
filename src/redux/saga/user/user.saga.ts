import { User } from "firebase/auth";
import { put, call } from "redux-saga/effects";
import { userService } from "./user.service";
import { setUser } from "../../actions/user/user.action";
import { SagaPayload } from "@/src/redux/entities";
import { DetailDto } from "@/src/dto/detail.dto";

/**
 * @param callback
 * @description
 * Fetch user profile data with credential JWT localstorage value
 */
export function* getUserProfile({
  payload,
  callback,
}: SagaPayload<DetailDto, User>) {
  try {
    const profile: User = yield call(userService.getPublicProfile, payload);
    yield put(setUser(profile));
    callback && callback(profile);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
