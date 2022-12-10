import { FC } from "react";
import { Modal } from "antd";
import { ConfirmModalProps } from "./types";
import { utilsProvider } from "@/src/utils";
import { useRouter } from "next/router";

export const ConfirmedTransactionModal: FC<ConfirmModalProps> = (props) => {
  const { seller, buyer } = props;
  const router = useRouter();

  return (
    <Modal
      open={props.isModalOpen}
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
            Your swap with{" "}
            <strong>{utilsProvider.makeShort(seller?.walletAddress, 4)}</strong>{" "}
            has been completed successfully.
          </p>

          <button
            type="button"
            onClick={() => router.push(`/u/${buyer.id}/history`)}
            className="flex justify-center items-center w-full !bg-purple text-white rounded-3xl text-lg font-bold py-3"
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};
