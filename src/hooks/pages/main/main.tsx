import { ReactNode, useCallback, useState } from "react";
import { MainContext } from "./types";
import { NFTDetailsModal } from "@/src/components/modal";

export const MainProvider = (props: { children: ReactNode }) => {
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
