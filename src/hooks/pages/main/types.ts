import { createContext, useContext } from "react";
import { UserChatEntity } from "@/src/entities/chatroom.entity";
import ReduxState from "@/src/redux/entities/state";
import {
  ChainId,
  ChainEntity,
  DEFAULT_CHAINS,
} from "@/src/entities/chain.entity";

/**
 * @dev Init hook state.
 */
export interface AppStateHook {
  appState: AppState;
  selectChatUser: (uid: string) => void;
}

/** @dev State interface. */
export interface AppState {
  chats: UserChatEntity[];
  chatRoomId: string;
}

/** @dev Export state contained in page interface */
export interface MainContextState extends ReduxState {
  /**
   * @dev The value present for transition loading.
   * @note This is the loading of the page transition.
   */
  transitionLoading: boolean;

  /**
   * @dev The value present for first loading.
   * @note This is the first loading of the page.
   */
  fistLoading: boolean;

  /**
   * @dev Chain id.
   * @see src/entities/chain.entity.ts
   * @note This is the chain id of the current chain.
   */
  chainId: ChainId;

  /**
   * @dev Chain info.
   * @see src/entities/chain.entity.ts
   * @note This is the chain info of the current chain.
   */
  chainInfo: ChainEntity;

  /**
   * @dev Default chains.
   * @see src/entities/chain.entity.ts
   * @note This is the default chains.
   */
  defaultChains: typeof DEFAULT_CHAINS;

  /**
   * @dev The function to select chain.
   * @param chainId Chain id.
   * @returns {void}
   */
  selectChain(chainId: ChainId): void;

  /**
   * @dev The value present for open nft detail modal.
   * @note This is the open nft detail modal.
   */
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
