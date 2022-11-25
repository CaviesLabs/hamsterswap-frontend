import { ReactNode, useCallback, useState } from "react";
import { MainContext } from "./types";
import { NFTDetailsModal } from "@/src/components/modal";
import { useUI } from "@/src/utils";

export const MainProvider = (props: { children: ReactNode }) => {
  /** @dev Call hook to use functions related to UI process. */
  useUI();

  /**
   * @dev Define condition to show Nft-detail modal.
   */
  const [nftModal, setNftModal] = useState(false);

  /**
   * @dev Define function to open nft-details modal.
   */
  const openNftDetailModal = useCallback(() => setNftModal(true), [nftModal]);

  return (
    <MainContext.Provider value={{ openNftDetailModal }}>
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
