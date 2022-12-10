import { FC, useMemo } from "react";
import { Col, Modal, Row } from "antd";
import { toast } from "@hamsterbox/ui-kit";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { useMain } from "@/src/hooks/pages/main";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { NftEntity, NftStatus } from "@/src/dto/nft.dto";
import { allowNTFCollection } from "@/src/dto/platform-config";
import { useSelector } from "react-redux";

export const AddNftModal: FC<AddItemModalProps> = (props) => {
  /**
   * @dev Get user list nfts.
   */
  const { nft: ownerNftList } = useMain();

  /**
   * @dev get allowed NFTs from hamster config
   */
  const allowNftCollections: allowNTFCollection[] = useSelector(
    (state: any) => state.platformConfig?.allowNTFCollections
  );

  /**
   * @dev Import functions in screen context.
   */
  const { addOfferItem, offferedItems } = useCreateProposal();

  const nftsMemo = useMemo<NftEntity[]>(() => {
    return ownerNftList.filter((item) => {
      return (
        !offferedItems.find((s) => s.nft_address === item.nft_address) &&
        allowNftCollections.find((s) => s.id === item.nft_collection_id) &&
        item.nft_status.valueOf() !== NftStatus.transfer.valueOf()
      );
    });
  }, [ownerNftList, offferedItems, allowNftCollections]);

  /**
   * @dev The function to handle adding nft to offered field for proposal.
   * @param {NftItem} nftItem
   */
  const handleAddNft = (nftItem: NftEntity) => {
    if (offferedItems.length === 4) {
      return toast.warn("Only a maximum of 4 items are allowed");
    }

    /**
     * @dev Add to @arrays in context.
     */
    addOfferItem(
      {
        ...nftItem,
        nftId: nftItem.nft_address,
        assetType: SwapItemType.NFT,
      },
      AssetTypes.nft
    );

    /**
     * @dev Call to close modal.
     */
    props.handleOk();
  };

  return (
    <Modal
      title={<p className="text-2xl">Add NFT</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchInput
              className="rounded-3xl p-3"
              placeholder="Search for NFT, collection "
            />
            <div className="mt-10 max-h-96 overflow-scroll">
              {nftsMemo?.map((nftItem, i) => (
                <Row
                  className="bg-white rounded-lg p-4 w-full mb-4 cursor-pointer hover:bg-dark30"
                  key={`add-nft-item-pr-${i}`}
                  onClick={() => handleAddNft(nftItem)}
                >
                  <Col span={5}>
                    <img
                      className="rounded bg-dark10"
                      src={nftItem.nft_image_uri}
                      alt=""
                    />
                  </Col>
                  <Col span={18} className="pl-6">
                    <p className="font-bold text-lg">{nftItem.nft_name}</p>
                    <p className="text-lg">
                      <span className="text-indigo-600">
                        {nftItem.nft_symbol}
                      </span>
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
