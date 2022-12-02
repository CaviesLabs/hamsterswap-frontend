import { FC, useState } from "react";
import { Input, Modal } from "antd";
import { AddItemModalProps } from "./types";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { SolanaIcon } from "@/src/components/icons";

export const AddSolModal: FC<AddItemModalProps> = (props) => {
  const [value, setValue] = useState("");

  return (
    <Modal
      title={<p className="text-2xl">Add SOL</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Input
              size="large"
              className="rounded-2xl p-3 mt-2"
              placeholder="Enter SOL amount"
              prefix={<SolanaIcon />}
              suffix="SOL"
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="text-lg regular-text flex items-center mt-5">
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
