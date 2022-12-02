import { takeLatest } from "redux-saga/effects";
import { getUserProfile } from "./user/user.saga";
import { signUpWithEmail } from "./auth/auth.saga";
import { listNft } from "./nft/nft.saga";
import { GET_USER_PROFILE, LIST_NFT, SIGNUP_EMAIL } from "@/src/redux/actions";

export default function* root() {
  yield takeLatest<any>(GET_USER_PROFILE, getUserProfile);
  yield takeLatest<any>(SIGNUP_EMAIL, signUpWithEmail);
  yield takeLatest<any>(LIST_NFT, listNft);
}
