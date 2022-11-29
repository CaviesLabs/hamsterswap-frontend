import { combineReducers } from "redux";
import userReducer from "./user";
import userChatReducer from "./user-chat";
import State from "@/src/redux/entities/state";

const reducer = combineReducers<State>({
  user: userReducer,
  userChats: userChatReducer,
});

export const initState: State = {
  user: null,
  userChats: [],
};

export default reducer;
