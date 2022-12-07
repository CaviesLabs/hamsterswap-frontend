import { FC } from "react";
import { Modal } from "antd";
import { ModalProps } from "./types";
import { Button } from "@hamsterbox/ui-kit";

export const ConfirmedTransactionModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <div className="py-6">
        <div className="mx-auto max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex flex-col justify-center">
          <img
            src="/assets/images/success-icon.png"
            alt="Swap item Success"
            className="mx-auto"
          />

          <h2 className="mt-4 mb-2 font-bold text-gray-800 text-2xl text-center">
            Success!
          </h2>
          <p className="mb-6 text-lg text-center">
            You have created a proposal successfully.
          </p>

          <Button
            shape="primary"
            size="large"
            onClick={() => props.handleCancel()}
            text="View Proposal"
            className="mb-3"
          />
          <Button
            shape="secondary"
            size="large"
            onClick={() => props.handleCancel()}
            text="Go home"
          />
        </div>
      </div>
    </Modal>
  );
};
