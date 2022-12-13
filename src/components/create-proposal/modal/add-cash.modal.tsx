import { ChangeEventHandler, FC, SetStateAction, useState } from "react";
import { Col, Input, Modal, Row, Radio } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { DollarIcon, PlusIcon } from "@/src/components/icons";

const RadioGroup = Radio.Group;

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

const decimalCount = (num: any) => {
  // Convert to String
  const numStr = `${num}`;
  // String Contains Decimal
  if (numStr.includes(".")) {
    return numStr.split(".")[1].length;
  }
  // String Does Not Contain Decimal
  return 0;
};

export const AddCashModal: FC<AddItemModalProps> = (props) => {
  const [value, setValue] = useState("");
  const [checkedData, setCheckedData] = useState<any>(null);

  const handleChangeCashValue: ChangeEventHandler<HTMLInputElement> = (e: {
    target: { value: string | SetStateAction<string> };
  }) => {
    if (!isNaN(+e.target.value)) {
      if (decimalCount(+e.target.value) > 8) {
        const val = `${Math.round(+e.target.value * 100000000) / 100000000}`;
        setValue(val);
      } else {
        setValue(`${e.target.value}`);
      }
    } else {
      setValue(`${e.target.value}`);
    }
  };

  const handleAddCash = () => {
    props.handleOk(value, checkedData);
  };

  return (
    <Modal
      title={<p className="text-2xl">Add Cash</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      destroyOnClose={true}
      className="hamster-modal"
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl">
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter USD amount"
              prefix={<DollarIcon />}
              suffix="USD"
              value={value}
              // onChange={(e) => setValue(e.target.value)}
              onChange={handleChangeCashValue}
            />
            <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-bold">Payment Method</p>
              <div className="flex items-center text-indigo-600">
                <PlusIcon className="border-indigo-600" />
                <p className="text-lg ml-4">Add more</p>
              </div>
            </div>
            <RadioGroup
              className="w-full"
              onChange={(e) => setCheckedData(e.target.value)}
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
                        <Radio value={nftItem.name.toLowerCase()} />
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            </RadioGroup>

            <button
              //disabled={checkedList.length === 0}
              disabled={
                !checkedData ||
                !value ||
                parseFloat(value) === 0 ||
                isNaN(parseFloat(value)) ||
                +value !== parseFloat(value)
              }
              type="button"
              onClick={handleAddCash}
            >
              Add {checkedData}
            </button>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
