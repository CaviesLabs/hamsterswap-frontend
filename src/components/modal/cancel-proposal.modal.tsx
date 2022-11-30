import { FC } from "react";
import { Modal } from "antd";
import { ModalProps } from "./types";

export const CancelProposalModal: FC<ModalProps> = (props) => {
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
            src="/assets/images/warning-icon.png"
            alt="Warning item"
            className="mx-auto"
          />

          <h2 className="mt-4 mb-2 font-bold text-gray-800 text-2xl text-center">
            Cancel proposal?
          </h2>
          <p className="mb-6 text-lg text-center">
            Are you sure you want to cancel your proposal ? You won't be able to
            undo.
          </p>

          <button
            type="button"
            onClick={props.handleOk}
            className="w-full !bg-red-500 text-white rounded-3xl text-lg font-bold py-3"
          >
            Yes, Cancel Proposal
          </button>
          <div className="mt-4">
            <button
              type="button"
              onClick={props.handleCancel}
              className="w-full !bg-white !text-purple border border-2 border-purple rounded-3xl text-lg font-bold py-3"
            >
              Keep Proposal
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
