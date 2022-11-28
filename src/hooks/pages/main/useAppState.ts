import { useReducer } from "react";
import { User } from "firebase/auth";
import { AppState, Action, ActionKind, AppStateHook } from "./types";

/**
 * @dev Init app state.
 */
export const INIT_APP_STATE: AppState = {
  user: null,
  chats: [],
  chatRoomId: "",
};

export const useAppState = (): AppStateHook => {
  /** @dev Config main reducer. */
  const appReducer = (state: any, action: Action) => {
    const newState: AppState = state as AppState;
    switch (action.type) {
      case ActionKind.CHANGE_CHAT_ROOM_ID:
        newState.chatRoomId = action.roomId;
        break;
      case ActionKind.CHANGE_USER:
        newState.user = action.user;
        break;
      default:
        return state;
    }
    return newState;
  };

  /** @dev Config state. */
  const [appState, dispatch] = useReducer(appReducer, INIT_APP_STATE);

  return {
    appState,
    updateUser: (user: User) =>
      dispatch({ type: ActionKind.CHANGE_USER, user }),
    selectChatUser: (roomId: string) =>
      dispatch({ type: ActionKind.CHANGE_CHAT_ROOM_ID, roomId }),
  };
};
