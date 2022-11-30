import { SET_USER_CHATS } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { UserChatEntity } from "@/src/entities/chatroom.entity";

export default (state: UserChatEntity[] = [], action: Action) => {
  if (action.type === SET_USER_CHATS) {
    return action.payload;
  }
  return state;
};
