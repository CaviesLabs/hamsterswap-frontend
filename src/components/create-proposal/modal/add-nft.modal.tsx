import { FC, useMemo, useState } from "react";
import { Col, Modal, Row } from "antd";
import { toast } from "@hamsterbox/ui-kit";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { NftEntity, NftStatus } from "@/src/dto/nft.dto";
import { useSelector } from "@/src/redux";

export const AddNftModal: FC<AddItemModalProps> = (props) => {
  /**
   * @dev Search state.
   */
  const [searchValue, setSearchValue] = useState("");
  const { nft: ownerNftList, platformConfig } = useSelector();

  /**
   * @dev Import functions in screen context.
   */
  const { addOfferItem, offferedItems } = useCreateProposal();

  const nftsMemo = useMemo<NftEntity[]>(() => {
    // platformConfig?.allowNTFCollections.find((s) => s.idList.includes(item.collectionId)) &&
    return ownerNftList.filter(
      (item) =>
        !offferedItems.find((s) => s.address === item.address) &&
        item.status.valueOf() !== NftStatus.transfer.valueOf() &&
        item.name.includes(searchValue)
    );
  }, [
    platformConfig?.allowNTFCollections,
    ownerNftList,
    offferedItems,
    searchValue,
  ]);

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
        nftId: nftItem.id,
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
          <div className="mx-auto items-center max-w-3xl">
            <SearchInput
              className="rounded-3xl p-3"
              placeholder="Search for NFT, collection "
              onChange={(val: any) => setSearchValue(val?.target?.value)}
              value={searchValue}
            />
            <div className="mt-10 max-h-96 overflow-scroll">
              {nftsMemo.map((nftItem) => (
                <Row
                  className="bg-white rounded-lg p-4 w-full mb-4 cursor-pointer hover:bg-[#F0F3FA]"
                  key={Math.random().toString()}
                  onClick={() => handleAddNft(nftItem)}
                >
                  <Col span={5}>
                    <img
                      className="rounded-lg bg-dark10"
                      src={nftItem.image}
                      alt=""
                    />
                  </Col>
                  <Col span={18} className="pl-6">
                    <p className="font-bold text-lg">{nftItem.name}</p>
                    <p className="text-lg">
                      <span className="text-indigo-600">{nftItem.symbol}</span>
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
