import { takeLatest } from "redux-saga/effects";
import { getUserProfile } from "./user/user.saga";
import { signUpWithEmail } from "./auth/auth.saga";
import { getListNft } from "./nft/nft.saga";
import { getHProfile } from "./hamster-profile/profile.saga";
import {
  GET_USER_PROFILE,
  GET_LIST_NFT,
  SIGNUP_EMAIL,
  GET_H_PROFILE,
} from "@/src/redux/actions";

export default function* root() {
  yield takeLatest<any>(GET_USER_PROFILE, getUserProfile);
  yield takeLatest<any>(SIGNUP_EMAIL, signUpWithEmail);
  yield takeLatest<any>(GET_LIST_NFT, getListNft);
  yield takeLatest<any>(GET_H_PROFILE, getHProfile);
}
