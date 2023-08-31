import { FC } from "react";
import { Modal } from "antd";
import { ModalProps } from "../../modal/types";
import { Button } from "@hamsterbox/ui-kit";

export const CancelProposalModal: FC<ModalProps> = (props) => {
  /** @dev Handle click to accept cancel. */
  const handleConfirmCancel = async () => {
    await props.handleOk();
  };

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
          <Button
            type="button"
            onClick={handleConfirmCancel}
            className="!bg-red-500 text-white rounded-3xl text-lg font-bold py-3"
            theme={{ backgroundColor: "#DE2C47", color: "white" }}
            width="100%"
            text="Yes, Cancel Proposal"
            loading={props.isLoading}
          />
          <div className="mt-4">
            <Button
              type="button"
              onClick={props.handleCancel}
              className="!bg-red-500 text-white rounded-3xl text-lg font-bold py-3"
              shape="secondary"
              width="100%"
              text="Keep Proposal"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
