import { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import ReduxState from "@/src/redux/entities/state";

/**
 * @dev Action kind.
 */
export enum ActionKind {
  CHANGE_CHAT_ROOM_ID = "CHANGE_CHAT_ROOM_ID",
  CHANGE_USER = "CHANGE_USER",
  UPDATE_CHATS = "UPDATE_CHATS",
}

/** @dev Common state reducer action. **/
export interface CommonAction {
  type: ActionKind;
}

/**
 * @dev Use this action to modify roomId.
 */
export interface ChangeChatRoomAction extends CommonAction {
  type: ActionKind.CHANGE_CHAT_ROOM_ID;
  roomId: string;
}

/**
 * @dev Use this action to update chat list.
 */
export interface UpdateChats extends CommonAction {
  type: ActionKind.UPDATE_CHATS;
  chats: UserChatEntity[];
}

/**
 * @dev Use this action to update user.
 */
export interface UpdateUser extends CommonAction {
  type: ActionKind.CHANGE_USER;
  user: User;
}

/**
 * @dev Declare avalaible AppState actions.
 */
export type Action = ChangeChatRoomAction | UpdateChats | UpdateUser;

/**
 * @dev Init hook state.
 */
export interface AppStateHook {
  appState: AppState;
  updateUser: (user: User) => void;
  selectChatUser: (uid: string) => void;
}

/** @dev State interface. */
export interface AppState {
  chats: UserChatEntity[];
  user: User;
  chatRoomId: string;
}

/** @dev Export state contained in page interface */
export interface MainContextState extends ReduxState {
  /** @dev Expose function to open nft detail modal. */
  openNftDetailModal(): void;
}

/** @dev Create context */
export const MainContext = createContext<MainContextState>(null);

/** @dev Export use context function */
export const useMain = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
