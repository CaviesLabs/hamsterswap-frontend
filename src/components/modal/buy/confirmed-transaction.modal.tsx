import { FC } from "react";
import { Button, Card, Carousel, Modal } from "antd";
import { BuyModalProps } from "./types";
import { Row, Col } from "antd"
import { utilsProvider } from "@/src/utils/utils.provider";

export const ConfirmedTransactionModal: FC<BuyModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <div className="py-6">
        <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <img
            src="/assets/images/success-icon.png"
            alt="Swap item Success"
            className="rounded-[50%] mx-auto"
          />

          <h2 className="mt-4 mb-2 font-bold text-gray-800 text-2xl text-center">
            Success!
          </h2>
          <p className="mb-6 text-lg text-center">
            Your swap with <strong>3t2yig...56xg</strong> has been completed successfully.
          </p>

          <button type="button" onClick={() => props.handleCancel} className="flex justify-center items-center w-full bg-purple text-white rounded-3xl text-lg font-bold py-3 hover:bg-blurPurple">
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};
