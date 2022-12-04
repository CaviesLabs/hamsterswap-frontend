import { combineReducers } from "redux";
import userReducer from "./user";
import userChatReducer from "./user-chat";
import nftReducer from "./nft";
import proposalReducer from "./proposal";
import hProfileReducer from "./hamster-profile";
import State from "@/src/redux/entities/state";

const reducer = combineReducers<State>({
  user: userReducer,
  userChats: userChatReducer,
  nft: nftReducer,
  proposal: proposalReducer,
  hProfile: hProfileReducer,
});

export const initState: State = {
  user: null,
  userChats: [],
  nft: { num_nfts: 0, page: 0, list_nfts: [] },
  proposal: {
    swapItems: [],
    receiveItems: [],
  },
  hProfile: null,
};

export default reducer;
