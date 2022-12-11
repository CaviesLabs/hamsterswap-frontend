import { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import ReduxState from "@/src/redux/entities/state";

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

  /** @dev The value present for page transition. */
  transitionLoading: boolean;

  /** @dev Detect fist loading */
  fistLoading: boolean;
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
