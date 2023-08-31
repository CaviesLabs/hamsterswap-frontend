import { FC, useCallback, useState } from "react";
import { Modal } from "antd";
import { AddExpectedItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { AddExpectedNftForm } from "@/src/components/create-proposal/modal/add-expected-nft-form";
import { AddExpectedNftDetail } from "@/src/components/create-proposal/modal/add-expected-nft-detail";
import { NftService } from "@/src/services/nft.service";
import { NftEntity } from "@/src/dto/nft.dto";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { toast } from "@hamsterbox/ui-kit";
import { isEmpty } from "lodash";
import animationData from "@/src/components/icons/animation-loading.json";
import Lottie from "react-lottie";
import { useMain } from "@/src/hooks/pages/main";
import { ChainId } from "@/src/entities/chain.entity";

export const AddExpectedNftModal: FC<AddExpectedItemModalProps> = (props) => {
  /**
   * @dev Import functions in screen context.
   */
  const { offferedItems, expectedItems, addExpectedItem } = useCreateProposal();

  /**
   * @dev initialize states for collection id and nft id from form
   */
  const [collection, setCollection] = useState<string[]>([]);
  const [nftId, setNftId] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [nft, setNft] = useState<NftEntity>();
  const [step, setStep] = useState(0);
  const { platformConfig, chainId } = useMain();

  /**
   * @dev The function to fetch nft data from api
   * @param {string} nftId
   * @returns
   */
  const handleFetchNftData = useCallback(
    (nftId: string) => {
      setStep && setStep(1);
      NftService.getService(chainId)
        .getNftDetail({
          contractAddress: chainId === ChainId.solana ? nftId : collection?.[0],
          tokenId,
          chainId,
        })
        .then((resp) => {
          if (!resp) {
            toast("NFT is not found with ID!");
            return setStep(0);
          }
          setNft(resp);
          setStep(2);
        })
        .catch(() => {
          setStep(4);
        });
    },
    [tokenId, chainId, collection]
  );

  /**
   * Handle save expected nfts to redux-store
   * @param nftItem
   */
  const handleAddNft = (nftItem: NftEntity) => {
    if (expectedItems[props.index]?.askingItems.length === 4) {
      return toast.warn("Only a maximum of 4 items are allowed");
    }

    if (
      offferedItems.find((item) => nftItem.tokenId === item.tokenId) ||
      expectedItems.find((option) =>
        option.askingItems.find((item) => nftItem.tokenId === item.tokenId)
      )
    ) {
      return toast.error(
        "Please note that items selected in the offer tab are non-reselectable. Kindly choose differently."
      );
    }

    if (
      expectedItems[props.index]?.askingItems
        .map((_) => _.address)
        .indexOf(nftItem.address) > -1
    ) {
      return toast.warn("Item is there in choice");
    }

    if (offferedItems.map((_) => _.address).indexOf(nftItem.address) > -1) {
      return toast.warn("Item is there in your offered list");
    }

    /**
     * @dev Add in context.
     */
    addExpectedItem(
      {
        ...nftItem,
        nftId: nftItem.id,
        assetType: SwapItemType.NFT,
      },
      AssetTypes.nft,
      props.index
    );

    /**
     * @dev Close modal.
     */
    props.handleOk();
    setCollection([]);
    setStep(0);
  };

  return (
    <Modal
      title={<p className="text-2xl">Add NFT</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={(e) => {
        setStep(0);
        props.handleCancel(e);
      }}
      width={560}
      bodyStyle={{
        height: "auto",
      }}
      footer={null}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-4">
          <div className="mx-auto items-center max-w-3xl">
            {step === 0 && (
              <AddExpectedNftForm
                collection={collection}
                setCollection={setCollection}
                nftId={nftId}
                tokenId={tokenId}
                setNftId={setNftId}
                setTokenId={setTokenId}
                allowNTFCollections={platformConfig?.allowNTFCollections}
              />
            )}
            {step === 1 && (
              <div className="max-w-[185px] mx-auto">
                <Lottie
                  options={{
                    animationData,
                  }}
                />
              </div>
            )}
            {step === 2 && nft && <AddExpectedNftDetail nft={nft} />}
            {step === 4 && (
              <div className="text-center">
                <img
                  src="https://pocket.hamsterbox.xyz/assets/images/empty-icon.png"
                  alt="NFT Not Found"
                  className="mx-auto w-[200px] h-[200px]"
                />
                <p className="text-center text-[20px]">
                  The NFT associated with the provided ID and Collection Name
                  cannot be located !.
                </p>
              </div>
            )}
            <div>
              {step === 0 && (
                <button
                  type="button"
                  onClick={() => handleFetchNftData(nftId)}
                  disabled={
                    isEmpty(collection) ||
                    (chainId === ChainId.solana && !nftId) ||
                    (chainId !== ChainId.solana && !tokenId)
                  }
                >
                  Next
                </button>
              )}
              {step === 2 && (
                <button type="button" onClick={() => handleAddNft(nft)}>
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
