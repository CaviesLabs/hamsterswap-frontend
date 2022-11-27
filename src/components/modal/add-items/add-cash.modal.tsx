import { FC, useState } from "react";
import { Checkbox, Col, Input, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/modal/add-items/add-nft.styled";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { DollarIcon, PlustIcon } from "@/src/components/icons";

const CheckboxGroup = Checkbox.Group;

const mockNftItems = [
  {
    image: "/assets/images/paypal.png",
    name: "Paypal",
    email: "hung@cavies.xyz",
    resourceUrl: "#",
  },
  {
    image: "/assets/images/stripe.png",
    name: "Stripe",
    email: "hung@cavies.xyz",
    resourceUrl: "#",
  },
];

export const AddCashModal: FC<AddItemModalProps> = (props) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  return (
    <Modal
      title={<p className="text-3xl">Add Cash</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter USD amount"
              prefix={<DollarIcon />}
              suffix="USD"
            />
            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">Payment Method</p>
              <div className="flex items-center text-indigo-600">
                <PlustIcon className="border-indigo-600" />
                <p className="text-lg ml-4">Add more</p>
              </div>
            </div>
            <CheckboxGroup
              className="w-full"
              onChange={(list) => setCheckedList(list)}
            >
              <div className="w-full max-h-96 overflow-scroll">
                {mockNftItems.map((nftItem, i) => (
                  <Row
                    key={`add-cash-item-pr-${i}`}
                    align="middle"
                    className="bg-white rounded-lg p-4 w-full mb-4"
                  >
                    <Col span={3}>
                      <div className="h-[56px] flex justify-center items-center">
                        <img src={nftItem.image} />
                      </div>
                    </Col>
                    <Col span={18} className="pl-6">
                      <p className="font-bold text-lg">{nftItem.name}</p>
                      <p className="text-lg regular-text">{nftItem.email}</p>
                    </Col>
                    <Col span={1}>
                      <div className="h-[56px] flex justify-end items-center">
                        <Checkbox value={i} />
                      </div>
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
