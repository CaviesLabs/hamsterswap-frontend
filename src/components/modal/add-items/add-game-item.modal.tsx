import { FC, useState } from "react";
import { Col, Input, Modal, Row, Upload } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/modal/add-items/add-nft.styled";
import { CheckIcon, LoadingIcon } from "@/src/components/icons";
import Select from "@/src/components/select";

const { Dragger } = Upload;
const { TextArea } = Input;

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
  const [, setValue] = useState("");

  return (
    <Modal
      title={<p className="text-3xl">Add in-game item</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={970}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6 flex flex-row">
          <div className="basis-2/5 pr-8">
            <p className="font-bold text-lg">Upload Image</p>
            <p className="text-dark60">Support JPG, PNG, maximum 2MB</p>

            <div className="mt-5">
              {mockImages.map((image, index) => (
                <Row
                  className="bg-dark10 rounded-lg p-4 w-full mb-4"
                  key={`add-game-item-pr-${index}`}
                >
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
            <div className="h-30">
              <Dragger {...props}>
                <div className="flex items-center px-4">
                  <div className="w-24">
                    <div className="p-4 rounded-lg bg-dark10">
                      <img
                        className="w-full"
                        src="/assets/images/thumbnail-icon.png"
                      />
                    </div>
                  </div>

                  <p className="text-lg text-left regular-text ml-4 text-gray-500">
                    Drag and drop here or{" "}
                    <a className="text-indigo-600">browser</a>
                  </p>
                </div>
              </Dragger>
            </div>
          </div>
          <div className="basis-3/5 w-full pl-8">
            <p className="text-dark60 text-lg">Item Name *</p>
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter item name"
              onChange={(e) => setValue(e.target.value)}
            />

            <p className="text-dark60 text-lg mt-4">Game Name *</p>
            <Select
              placeholder="Select game"
              searchPlaceholder="Search game name / publisher"
              options={[
                {
                  image:
                    "https://ecdn.game4v.com/g4v-content/uploads/2020/12/ava-7-1024x1024.jpg",
                  name: "Vo Lam Truyen Ky",
                  publisher: "VNG Games",
                },
                {
                  image:
                    "https://modtodo.com/uploads/2022/7/garena-free-fire-5th-anniv-thumbnail-150.jpg",
                  name: "Free Fire",
                  publisher: "Garena",
                },
                {
                  image:
                    "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Flappy_Bird_icon.png/220px-Flappy_Bird_icon.png",
                  name: "Flappy Bird",
                  publisher: "Nguyen Dinh Dong",
                },
                {
                  image:
                    "https://cdna.artstation.com/p/assets/images/images/033/698/904/large/nkung-tran-04.jpg",
                  name: "Caravan War",
                  publisher: "HIKER GAMES",
                },
              ]}
            />

            <p className="text-dark60 text-lg mt-4">Game ID *</p>
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter game id"
              value="6464242413 - Meow7"
            />

            <p className="text-dark60 text-lg mt-4">Description</p>
            <TextArea
              rows={4}
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter game id"
              value="Lorem ipsum dolor sit amet consectetur. Faucibus volutpat velit aliquam praesent donec habitant morbi id quis. Quis ut nunc nulla adipiscing duis."
            />

            <button
              // disabled={!value}
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
