import { FC } from "react";
import { Modal } from "antd";
import { NftDetailsModalProps } from "./types";
import { Row, Col } from "antd";
import Flickity from "react-flickity-component";
import { ModalStyle } from "./game-item.style";

export const GameItemModal: FC<NftDetailsModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={945}
      footer={null}
      className="hamster-modal"
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <div className="w-[80%] mx-auto">
                <ModalStyle>
                  <Flickity>
                    <img
                      src="https://placeimg.com/640/480/animals"
                      alt="nft image"
                      className="rounded w-lg h-[260px]"
                    />
                    <img
                      src="https://placeimg.com/640/480/nature"
                      alt="nft image"
                      className="rounded w-lg h-[260px]"
                    />
                    <img
                      src="https://placeimg.com/640/480/architecture"
                      alt="nft image"
                      className="rounded w-lg h-[260px]"
                    />
                    <img
                      src="https://placeimg.com/640/480/animals"
                      alt="nft image"
                      className="rounded w-lg h-[260px]"
                    />
                  </Flickity>
                </ModalStyle>
              </div>
            </Col>
            <Col span={14}>
              <div className="md:basis-2/3 ml-16 mr-8">
                <p className="text-gray-500">Item name</p>
                <h2 className="mb-6 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  Nhac Vuong Kiem
                </h2>
                <p className="text-gray-500">Game</p>
                <a href="#" className="text-indigo-600 hover:underline">
                  Vo Lam Truyen Ky
                </a>
                <p className="mt-6 text-gray-500">Game ID</p>
                <p className="mb-6">6464242413 - Meow7</p>
                <p className="mt-6 text-gray-500">Description</p>
                <p className="mb-6">
                  Lorem ipsum dolor sit amet consectetur. Faucibus volutpat
                  velit aliquam praesent donec habitant morbi id quis. Quis ut
                  nunc nulla adipiscing duis.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
};
