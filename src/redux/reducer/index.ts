import { combineReducers } from "redux";
import { chainIdReducer } from "./user";
import userChatReducer from "./user-chat";
import nftReducer from "./nft";
import hProfileReducer from "./hamster-profile";
import hPublicProfileReducer from "./hamster-profile/public-profile";
import platformConfigReducer from "./platform-config";
import State from "@/src/redux/entities/state";
import { proposalReducer, proposalsReducer } from "./proposal";
import { ChainId } from "@/src/entities/chain.entity";

/**
 * @dev Initialize reducer for app state management.
 */
const reducer = combineReducers<State>({
  userChats: userChatReducer,
  nft: nftReducer,
  platformConfig: platformConfigReducer,
  user: hProfileReducer,
  hPublicProfile: hPublicProfileReducer,
  hProfile: hProfileReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
  chainId: chainIdReducer,
});

/**
 * @dev Declare default state for app.
 */
export const initState: State = {
  chainId: ChainId.klaytn,
  user: null,
  userChats: [],
  nft: [],
  proposals: [],
  proposal: null,
  hProfile: null,
  hPublicProfile: null,
  platformConfig: null,
};

export default reducer;
