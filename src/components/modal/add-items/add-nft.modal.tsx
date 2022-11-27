import { FC, useState } from "react";
import { Checkbox, Col, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { StyledModal } from "@/src/components/modal/add-items/add-nft.styled";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

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
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  return (
    <Modal
      title={<p className="text-3xl">Add NFT</p>}
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
            <CheckboxGroup onChange={(list) => setCheckedList(list)}>
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
                        <a
                          href={"#"}
                          className="text-indigo-600 hover:underline"
                        >
                          {nftItem.resource}
                        </a>
                      </p>
                    </Col>
                    <Col span={1}>
                      <Checkbox value={i} />
                    </Col>
                  </Row>
                ))}
              </div>
            </CheckboxGroup>

            <button
              disabled={checkedList.length === 0}
              type="button"
              onClick={props.handleCancel}
            >
              Add
            </button>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
