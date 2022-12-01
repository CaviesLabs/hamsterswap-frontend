import { FC } from "react";
import { Col, Modal, Row } from "antd";
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

export const AddNftModal: FC<AddItemModalProps> = (props) => {
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
            <SearchInput
              className="rounded-3xl p-3"
              placeholder="Search for NFT, collection "
            />
            <div className="mt-10 max-h-96 overflow-scroll">
              {mockNftItems.map((nftItem, i) => (
                <Row
                  className="bg-white rounded-lg p-4 w-full mb-4"
                  key={`add-nft-item-pr-${i}`}
                >
                  <Col span={5}>
                    <img className="rounded" src={nftItem.image} />
                  </Col>
                  <Col span={18} className="pl-6">
                    <p className="font-bold text-lg">{nftItem.name}</p>
                    <p className="text-lg">
                      <div className="text-indigo-600">{nftItem.resource}</div>
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
