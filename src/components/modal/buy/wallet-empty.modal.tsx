import { FC } from "react";
import { Button, Card, Carousel, Modal } from "antd";
import { NftDetailsModalProps } from "./types";
import { Row, Col } from "antd"

export const WalletEmptyModal: FC<NftDetailsModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={650}
      footer={null}
    >
      <div className="py-6">
        <div className="flex flex-col items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <img
            src="/assets/images/sleep-hamster.png"
            alt="onchain, but there isn't item in wallet"
            className="h-full w-[175px] object-cover rounded-[8px]"
          />
          <h2 className="mb-2 font-bold text-gray-800 text-xl">
            Oops, something went wrong!
          </h2>
          <p className="mb-6 text-lg ">
            You don't have the required items for swapping.
          </p>

          <button onClick={() => props.handleCancel} className="w-full bg-purple text-white rounded-3xl text-lg font-bold py-3 hover:bg-blurPurple">
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
};
