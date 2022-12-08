import { FC } from "react";
import { Modal } from "antd";
import { BuyModalProps } from "./types";
import { Row, Col } from "antd";
import { utilsProvider } from "@/src/utils/utils.provider";
import { LoadingIcon } from "@/src/components/icons";

export const ConfirmTransactionModal: FC<BuyModalProps> = (props) => {
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
          <div className="w-11/12 mx-auto">
            <Row justify="space-between" align="middle">
              <Col span={8} className="flex flex-col items-center">
                <img
                  src="/assets/images/sample-avatar.png"
                  alt="User avatar"
                  className="rounded-[50%] max-w-[80px]"
                />
                <div className="font-bold text-center text-xl">
                  {utilsProvider.makeShort(
                    "F8qedeJsnrFnLfKpT4QN3GeAQqQMtq4izNLR1dKb5eRS",
                    4
                  )}
                </div>
              </Col>
              <Col span={8}>
                <img
                  src="/assets/images/arrow-two-way.svg"
                  alt="arrow-two-way"
                  className="mx-auto mt-6"
                />
              </Col>
              <Col span={8} className="flex flex-col items-center">
                <img
                  src="/assets/images/sample-avatar-2.png"
                  alt="onchain, but there isn't item in wallet"
                  className="rounded-[50%] max-w-[80px]"
                />
                <div className="font-bold text-center text-xl">You</div>
              </Col>
            </Row>
          </div>

          <h2 className="mt-10 mb-2 font-bold text-gray-800 text-2xl text-center">
            Confirm transaction
          </h2>
          <p className="mb-6 text-lg text-center">
            Confirm the transaction in your wallet to swap item(s) with{" "}
            <strong>3t2yig...56xg</strong>.
          </p>

          <button
            type="button"
            onClick={() => props.handleCancel}
            className="flex justify-center items-center w-full bg-purple text-white rounded-3xl text-lg font-bold py-3 hover:bg-blurPurple"
          >
            {props.isLoading && <LoadingIcon className="text-white" />}
            {props.isLoading ? "Confirming transaction in wallet" : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
