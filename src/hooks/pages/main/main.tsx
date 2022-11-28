import { ReactNode, useCallback, useState } from "react";
import { MainContext } from "./types";
import { NFTDetailsModal } from "@/src/components/modal";
import Messages from "@/src/components/messages";
import { useUI } from "@/src/utils";
import { useAuth } from "./useAuth";
import { useAppState } from "./useAppState";

export const MainProvider = (props: { children: ReactNode }) => {
  /**
   * @dev Define condition to show Nft-detail modal.
   */
  const [nftModal, setNftModal] = useState(false);

  /**
   * @dev Define function to open nft-details modal.
   */
  const openNftDetailModal = useCallback(() => setNftModal(true), [nftModal]);

  /**
   * @dev Initilize app states and configure releated reducers.
   */
  const appState = useAppState();

  /** @dev Call hook to use functions related to UI process. */
  useUI();

  /** @dev Call hook to use functions related to User Authentication process. */
  useAuth();

  return (
    <MainContext.Provider value={{ openNftDetailModal, ...appState }}>
      {/**
       * @dev Render pages.
       */}
      {props.children}

      {/**
       * @dev Place to show nft modal.
       */}
      <NFTDetailsModal
        isModalOpen={nftModal}
        handleOk={() => setNftModal(true)}
        handleCancel={() => setNftModal(false)}
      />
      <Messages />
    </MainContext.Provider>
  );
};
