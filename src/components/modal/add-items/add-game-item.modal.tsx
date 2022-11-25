import { FC, useState } from "react";
import { Col, Input, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/modal/add-items/add-nft.styled";
import { CheckIcon, LoadingIcon, SolanaIcon } from "@/src/components/icons";

const mockImages = [
  {
    filepath:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    filename: "IMG_6946.JPG",
    filesize: "454KB",
    isLoading: false,
  },
  {
    filepath:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    filename: "IMG_7253.JPG",
    filesize: "44KB",
    isLoading: true,
  },
];

export const AddGameItemModal: FC<AddItemModalProps> = (props) => {
  const [value, setValue] = useState("");

  return (
    <Modal
      title="Add in-game item"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={970}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6 flex flex-row">
          <div className="basis-2/5">
            <p className="font-bold text-lg">Upload Image</p>
            <p className="text-dark60">Support JPG, PNG, maximum 2MB</p>

            <div className="mt-5">
              {mockImages.map((image) => (
                <Row className="bg-dark10 rounded-lg p-4 w-full mb-4">
                  <Col span={5}>
                    <img className="rounded" src={image.filepath} />
                  </Col>
                  <Col span={18} className="pl-6">
                    <p>{image.filename}</p>
                    <p>{image.filesize}</p>
                  </Col>
                  <Col span={1}>
                    {image.isLoading ? (
                      <LoadingIcon className="text-dark60" />
                    ) : (
                      <CheckIcon />
                    )}
                  </Col>
                </Row>
              ))}
            </div>
          </div>
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter SOL amount"
              prefix={<SolanaIcon />}
              suffix="SOL"
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="text-lg text-regular flex items-center mt-5">
              <p>Your balance:</p>
              <SolanaIcon className="ml-3 mr-2" />
              2,043.54 SOL
            </div>

            <div className="mt-14 w-1/2 ml-auto">
              <button
                disabled={!value}
                type="button"
                onClick={props.handleCancel}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
