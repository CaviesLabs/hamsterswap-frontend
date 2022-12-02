import { combineReducers } from "redux";
import userReducer from "./user";
import userChatReducer from "./user-chat";
import nftReducer from "./nft";
import State from "@/src/redux/entities/state";

const reducer = combineReducers<State>({
  user: userReducer,
  userChats: userChatReducer,
  nft: nftReducer,
});

export const initState: State = {
  user: null,
  userChats: [],
  nft: { num_nfts: 0, page: 0, list_nfts: [] },
};

export default reducer;
