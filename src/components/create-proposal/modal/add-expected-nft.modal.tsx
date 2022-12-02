import { FC, useState } from "react";
import { Col, Input, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { AttributeCard, AttributeProps } from "@/src/components/modal";

const Form = () => {
  return (
    <>
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
      />
    </>
  );
};

const Detail = () => {
  return (
    <div className="overflow-scroll h-96">
      <div className="mt-6 flex justify-between items-center">
        <div className="">
          <p className="text-dark60 text-lg">NFT Name</p>
          <p className="font-bold text-lg">4 En Counter Aqua</p>
          <p className="mt-6 text-dark60 text-lg">Collection</p>
          <p className="font-bold text-lg text-purple">Axie Infinity</p>
        </div>

        <div className="w-36 bg-dark30 p-4 rounded-2xl">
          <img
            className="aspect-square"
            src="https://theycb.files.wordpress.com/2020/11/3a15f-05ten9f4x0jgx9dsg.png"
          />
        </div>
      </div>
      <p className="mt-6 text-dark60 text-lg">Attributes</p>
      <Row gutter={[16, 16]}>
        {mockAttributes.map((attr, index) => (
          <Col span={12} key={`attr-item-${index}`}>
            <AttributeCard {...attr} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export const AddExpectedNftModal: FC<AddItemModalProps> = (props) => {
  const [step, setStep] = useState(0);

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
            {step === 0 && <Form />}
            {step === 1 && <Detail />}
            <div className="mt-14">
              {step === 0 && (
                <button type="button" onClick={() => setStep(1)}>
                  Next
                </button>
              )}
              {step === 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    setStep(0);
                    props.handleOk(e);
                  }}
                >
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

const mockAttributes: AttributeProps[] = [
  {
    title: "MOVE",
    value: "Aquastock",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "MOVE",
    value: "Carrot Hammer",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
];
