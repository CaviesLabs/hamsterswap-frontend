import { FC, useState } from "react";
import { Modal } from "antd";
import { AddExpectedItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { useDispatch, useSelector } from "react-redux";
import { allowNTFCollection } from "@/src/dto/platform-config";
import { AddExpectedNftForm } from "@/src/components/create-proposal/modal/add-expected-nft-form";
import { AddExpectedNftDetail } from "@/src/components/create-proposal/modal/add-expected-nft-detail";
import { nftService } from "@/src/redux/saga/nft/nft.service";
import { NftDetailDto } from "@/src/dto/nft.dto";
import { setProposal } from "@/src/redux/actions/proposal/proposal.action";

export const AddExpectedNftModal: FC<AddExpectedItemModalProps> = (props) => {
  const dispatch = useDispatch();

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
  const proposal = useSelector((state: any) => state.proposal);
  const handleAddNft = (nftItem: any) => {
    const item = {
      assetType: "nft",
      name: nftItem?.nft_name,
      nftAddress: nftItem?.nft_address,
      collectionId: nftItem?.nft_collection_id,
      image: nftItem?.nft_image,
      collection: nftItem?.nft_collection_name,
    };
    const receiveItems = proposal.receiveItems;
    receiveItems[props.index].push(item);
    dispatch(
      setProposal({
        ...proposal,
        receiveItems,
      })
    );
    if (receiveItems[props.index].length >= 4) {
      props.handleOk(nftItem);
    }
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
