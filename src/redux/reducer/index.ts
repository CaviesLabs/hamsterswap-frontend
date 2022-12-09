import { combineReducers } from "redux";
import userReducer from "./user";
import userChatReducer from "./user-chat";
import nftReducer from "./nft";
import hProfileReducer from "./hamster-profile";
import hPublicProfileReducer from "./hamster-profile/public-profile";
import platformConfigReducer from "./platform-config";
import { proposalReducer, proposalsReducer } from "./proposal";
import State from "@/src/redux/entities/state";

/**
 * @dev Initialize reducer for app state management.
 */
const reducer = combineReducers<State>({
  user: userReducer,
  userChats: userChatReducer,
  nft: nftReducer,
  platformConfig: platformConfigReducer,
  hProfile: hProfileReducer,
  hPublicProfile: hPublicProfileReducer,
  proposals: proposalsReducer,
  proposal: proposalReducer,
});

/**
 * @dev Declare default state for app.
 */
export const initState: State = {
  user: null,
  userChats: [],
  nft: [],
  proposals: [],
  proposal: null,
  hProfile: null,
  hPublicProfile: null,
  platformConfig: {
    maxAllowedOptions: 0,
    maxAllowedItems: 0,
    allowCurrencies: [],
    allowNTFCollections: [],
  },
};

export default reducer;
