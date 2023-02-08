import { FC } from "react";
import { Modal } from "antd";
import { ModalProps } from "../../modal/types";

export const CanceledProposalModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      className="hamster-modal"
    >
      <div className="py-6">
        <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <img
            src="/assets/images/success-icon.png"
            alt="Swap item Success"
            className="mx-auto"
          />

          <h2 className="mt-4 mb-2 font-bold text-gray-800 text-2xl text-center">
            Success!
          </h2>
          <p className="mb-6 text-lg text-center">
            You have cancel a proposal successfully. Tokens and NFTs will be
            automatically refunded to your wallet.
          </p>

          <button
            className="w-full !bg-purple text-white rounded-3xl text-xl py-3"
            type="button"
            onClick={props.handleCancel}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};
