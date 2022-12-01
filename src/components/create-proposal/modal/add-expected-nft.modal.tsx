import { FC } from "react";
import { Col, Input, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";

const mockNftItems = [
  {
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    name: "CyBall Chicken #124",
    resource: "CyBall",
    resourceUrl: "#",
  },
  {
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    name: "CyBall Chicken #124",
    resource: "CyBall",
    resourceUrl: "#",
  },
  {
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    name: "CyBall Chicken #124",
    resource: "CyBall",
    resourceUrl: "#",
  },
  {
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    name: "CyBall Chicken #124",
    resource: "CyBall",
    resourceUrl: "#",
  },
];

export const AddExpectedNftModal: FC<AddItemModalProps> = (props) => {
  return (
    <Modal
      title={<p className="text-2xl">Add NFT</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-dark60 text-lg">NFT Collection *</p>
            <SearchInput
              className="rounded-3xl p-3"
              placeholder="Search for NFT, collection"
            />

            <p className="mt-6 text-dark60 text-lg">NFT ID *</p>
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter NFT ID"
              // onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
