import { ReactNode, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { MainContext } from "./types";
import { NFTDetailsModal } from "@/src/components/modal";
import { useUI } from "./useUI";
import { useAuth } from "./useAuth";
import { useAppState } from "./useAppState";
import { useRouter } from "./useRouter";
import ReduxState from "@/src/redux/entities/state";

export const MainProvider = (props: { children: ReactNode }) => {
  /**
   * @dev Get redux state.
   */
  const reduxState = useSelector((app: ReduxState) => app);

  /**
   * @dev Define condition to show Nft-detail modal.
   */
  const [nftModal, setNftModal] = useState(false);

  /**
   * @dev Define function to open nft-details modal.
   */
  const openNftDetailModal = useCallback(() => setNftModal(true), [nftModal]);

  /** @dev Call hook to use functions related to UI process. */
  useUI();

  /** @dev Call hook to use functions related to User Authentication process. */
  useAuth();

  /** @dev Call hook to use functions related to update main states. */
  useAppState();

  /** @dev Call hooks to detect router changes. */
  const { transitionLoading, fistLoading } = useRouter();

  return (
    <MainContext.Provider
      value={{
        openNftDetailModal,
        transitionLoading,
        fistLoading,
        ...reduxState,
      }}
    >
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
    </MainContext.Provider>
  );
};
