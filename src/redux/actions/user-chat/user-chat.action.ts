import { UserChatEntity } from "@/src/entities/chatroom.entity";
import { SET_USER_CHATS } from "@/src/redux/actions";

/**
 * @param {UserChatEntity} userChats
 * @returns
 * @description
 * Update user profile in redux state
 */
export const setUserChats = (userChats: UserChatEntity[]) => ({
  type: SET_USER_CHATS,
  payload: userChats,
});
