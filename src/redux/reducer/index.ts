import { combineReducers } from "redux";
import userReducer from "./user";
import userChatReducer from "./user-chat";
import nftReducer from "./nft";
import { proposalReducer, proposalsReducer } from "./proposal";
import State from "@/src/redux/entities/state";

/**
 * @dev Initialize reducer for app state management.
 */
const reducer = combineReducers<State>({
  user: userReducer,
  userChats: userChatReducer,
  nft: nftReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
});

/**
 * @dev Declare default state for app.
 */
export const initState: State = {
  user: null,
  userChats: [],
  nft: { num_nfts: 0, page: 0, list_nfts: [] },
  proposal: null,
  proposals: [],
};

export default reducer;
