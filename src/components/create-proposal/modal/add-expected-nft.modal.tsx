import { FC, useState } from "react";
import { Modal } from "antd";
import { AddExpectedItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { useSelector } from "react-redux";
import { allowNTFCollection } from "@/src/dto/platform-config";
import { AddExpectedNftForm } from "@/src/components/create-proposal/modal/add-expected-nft-form";
import { AddExpectedNftDetail } from "@/src/components/create-proposal/modal/add-expected-nft-detail";
import { nftService } from "@/src/redux/saga/nft/nft.service";
import { NftDetailDto } from "@/src/dto/nft.dto";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { toast } from "@hamsterbox/ui-kit";

export const AddExpectedNftModal: FC<AddExpectedItemModalProps> = (props) => {
  /**
   * @dev Import functions in screen context.
   */
  const { offferedItems, expectedItems, addExpectedItem } = useCreateProposal();

  /**
   * @dev initialize states for collection id and nft id from form
   */
  const [collection, setCollection] = useState("");
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
          return setStep(0);
        }
        setNft(resp);
        setStep(2);
      });
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
      width={600}
      footer={null}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {step === 0 && (
              <AddExpectedNftForm
                collection={collection}
                setCollection={setCollection}
                nftId={nftId}
                setNftId={setNftId}
                allowNTFCollections={allowNTFCollections}
              />
            )}
            {step === 1 && <div>Loading</div>}
            {step === 2 && nft && <AddExpectedNftDetail nft={nft} />}
            <div className="mt-14">
              {step === 0 && (
                <button type="button" onClick={() => handleFetchNftData(nftId)}>
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
