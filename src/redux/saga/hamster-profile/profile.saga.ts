import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { hProfileService } from "@/src/redux/saga/hamster-profile/profile.service";
import {
  setProfile,
  setPublicProfile,
} from "@/src/redux/actions/hamster-profile/profile.action";
import { DetailDto } from "@/src/dto/detail.dto";

/**
 * @param callback
 * @description
 * Fetch user profile data with credential JWT localstorage value
 */
export function* getHProfile({
  callback,
}: SagaPayload<unknown, hProfileDto | undefined>) {
  try {
    const profile: hProfileDto = yield call(hProfileService.getUser);
    yield put(setProfile(profile));
    callback && callback(profile);
  } catch (err) {
    callback && callback(null);
  }
}

/**
 * @param callback
 * @description
 * Fetch public profile data with user id
 */
export function* getHPublicProfile({
  payload,
  callback,
}: SagaPayload<DetailDto, hProfileDto | undefined>) {
  try {
    const profile: hProfileDto = yield call(
      hProfileService.getPublicProfile,
      payload
    );
    yield put(setPublicProfile(profile));
    callback && callback(profile);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
