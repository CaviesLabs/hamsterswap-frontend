import { takeLatest } from "redux-saga/effects";
import { getUserProfile } from "./user/user.saga";
import { signUpWithEmail } from "./auth/auth.saga";
import { getListNft } from "./nft/nft.saga";
import { getHProfile, getHPublicProfile } from "./hamster-profile/profile.saga";
import { getPlatformConfig } from "./platform-config/platform-config.saga";
import {
  getListProposalByOwnerAddress,
  getExploreProposals,
} from "./proposal/proposal.saga";
import {
  GET_USER_PROFILE,
  GET_LIST_NFT,
  SIGNUP_EMAIL,
  GET_H_PROFILE,
  GET_PLATFORM_CONFIG,
  GET_H_PUBLIC_PROFILE,
  GET_PROPSALS,
  GET_EXPLORE_PROPOSALS,
} from "@/src/redux/actions";

export default function* root() {
  yield takeLatest<any>(GET_USER_PROFILE, getUserProfile);
  yield takeLatest<any>(SIGNUP_EMAIL, signUpWithEmail);
  yield takeLatest<any>(GET_LIST_NFT, getListNft);
  yield takeLatest<any>(GET_H_PROFILE, getHProfile);
  yield takeLatest<any>(GET_H_PUBLIC_PROFILE, getHPublicProfile);
  yield takeLatest<any>(GET_PLATFORM_CONFIG, getPlatformConfig);
  yield takeLatest<any>(GET_PROPSALS, getListProposalByOwnerAddress);
  yield takeLatest<any>(GET_EXPLORE_PROPOSALS, getExploreProposals);
}
