import { takeLatest } from "redux-saga/effects";
import { getListNft } from "./nft/nft.saga";
import { getHProfile, getHPublicProfile } from "./hamster-profile/profile.saga";
import { getPlatformConfig } from "./platform-config/platform-config.saga";
import {
  getListProposalByOwnerAddress,
  getExploreProposals,
  getProposal,
} from "./proposal/proposal.saga";
import {
  GET_LIST_NFT,
  GET_H_PROFILE,
  GET_PLATFORM_CONFIG,
  GET_H_PUBLIC_PROFILE,
  GET_PROPSALS,
  GET_EXPLORE_PROPOSALS,
  GET_PROPOSAL,
} from "@/src/redux/actions";

export default function* root() {
  yield takeLatest<any>(GET_LIST_NFT, getListNft);
  yield takeLatest<any>(GET_H_PROFILE, getHProfile);
  yield takeLatest<any>(GET_H_PUBLIC_PROFILE, getHPublicProfile);
  yield takeLatest<any>(GET_PLATFORM_CONFIG, getPlatformConfig);
  yield takeLatest<any>(GET_PROPSALS, getListProposalByOwnerAddress);
  yield takeLatest<any>(GET_EXPLORE_PROPOSALS, getExploreProposals);
  yield takeLatest<any>(GET_PROPOSAL, getProposal);
}
