import { FC } from "react";
import { Button, Card, Carousel, Modal } from "antd";
import { BuyModalProps } from "./types";
import { Row, Col } from "antd"
import { utilsProvider } from "@/src/utils/utils.provider";

export const ConfirmTransactionModal: FC<BuyModalProps> = (props) => {
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
                <div className="font-bold text-center text-xl">
                  You
                </div>
              </Col>
            </Row>
          </div>

          <h2 className="mt-10 mb-2 font-bold text-gray-800 text-2xl text-center">
            Confirm transaction
          </h2>
          <p className="mb-6 text-lg text-center">
            Confirm the transaction in your wallet to swap item(s) with <strong>3t2yig...56xg</strong>.
          </p>

          <button type="button" onClick={() => props.handleCancel} className="flex justify-center items-center w-full bg-purple text-white rounded-3xl text-lg font-bold py-3 hover:bg-blurPurple">
            {props.isLoading && (
            <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path className="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            )}
            {props.isLoading ? "Confirming transaction in wallet" : "Confirm"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
