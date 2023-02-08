import { FC, useState } from "react";
import { Modal } from "antd";
import { AddExpectedItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { useSelector } from "react-redux";
import { allowNTFCollection } from "@/src/entities/platform-config.entity";
import { AddExpectedNftForm } from "@/src/components/create-proposal/modal/add-expected-nft-form";
import { AddExpectedNftDetail } from "@/src/components/create-proposal/modal/add-expected-nft-detail";
import { nftService } from "@/src/redux/saga/nft/nft.service";
import { NftDetailDto } from "@/src/dto/nft.dto";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { toast } from "@hamsterbox/ui-kit";
import animationData from "@/src/components/icons/animation-loading.json";
import Lottie from "react-lottie";
import { isEmpty } from "lodash";

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

  const allowNTFCollections: allowNTFCollection[] = useSelector(
    (state: any) => state.platformConfig?.allowNTFCollections
  );

  const [step, setStep] = useState(0);

  const [nft, setNft] = useState<NftDetailDto>();
  const handleFetchNftData = (_nftId: string) => {
    setStep && setStep(1);
    nftService
      .getNftDetail({
        mintAddress: _nftId,
      })
      .then((resp) => {
        if (!resp) {
          toast("NFT is not found with ID!");
          return setStep(0);
        }
        setNft(resp);
        setStep(2);
      })
      .catch(() => {});
  };

  /**
   * Handle save expected nfts to redux-store
   * @param nftItem
   */
  const handleAddNft = (nftItem: NftDetailDto) => {
    if (expectedItems[props.index]?.askingItems.length === 4) {
      return toast.warn("Only a maximum of 4 items are allowed");
    }

    if (
      expectedItems[props.index]?.askingItems
        .map((_) => _.nft_address)
        .indexOf(nftItem.nft_address) > -1
    ) {
      return toast.warn("Item is there in choice");
    }

    if (
      offferedItems.map((_) => _.nft_address).indexOf(nftItem.nft_address) > -1
    ) {
      return toast.warn("Item is there in your offered list");
    }

    /**
     * @dev Add in context.
     */
    addExpectedItem(
      {
        nft_address: nftItem.nft_address,
        nft_name: nftItem.nft_name,
        nft_symbol: nftItem.nft_symbol,
        nft_collection_id: nftItem.nft_collection_id,
        start_holding_time: 0,
        stop_hodling_time: 0,
        nft_last_traded_price: 0,
        nft_listing_price: 0,
        nft_image_uri: nftItem.nft_image,
        nftId: nftItem.nft_address,
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
        height: 290,
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
                setNftId={setNftId}
                allowNTFCollections={allowNTFCollections}
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
            <div>
              {step === 0 && (
                <button
                  type="button"
                  onClick={() => handleFetchNftData(nftId)}
                  disabled={isEmpty(collection) || !nftId}
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
