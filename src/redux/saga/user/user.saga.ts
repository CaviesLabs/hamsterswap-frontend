import { UserEntity } from "@/src/entities/user.entity";
import { put, call } from "redux-saga/effects";
import { userService } from "./user.service";
import { setUser } from "../../actions/user/user.action";
import { SagaPayload } from "@/src/redux/entities";

/**
 * @param callback
 * @description
 * Fetch user profile data with credential JWT localstorage value
 */
export function* getUserProfile({
  callback,
}: SagaPayload<unknown, UserEntity>) {
  try {
    const profile: UserEntity = yield call(userService.getUser);

    yield put(setUser(profile));

    callback && callback(profile);
  } catch {
    callback && callback(null);
  }
}
