import { FC } from "react";
import { ProposalItem } from "@/src/components/proposal-item";
import { Col, Row } from "antd";
import { ConfirmedTransactionModal } from "@/src/components/create-proposal/step5/confirmed-transaction.modal";
import { SummaryProps } from "@/src/components/create-proposal/step5/types";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";

export const Step5: FC<SummaryProps> = ({ modalOpened, setModalOpened }) => {
  /**
   * @dev Import functions from context screen.
   */
  const { expectedItems, offferedItems, note, expiredTime, guaranteeSol } =
    useCreateProposal();

  /**
   * @dev Use this condition to show guarantee badge.
   */
  const isGuaranteedPayment = !!guaranteeSol;

  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Confirm
      </h3>
      <div className="block mt-[60px] flex">
        <ProposalItem
          swapItems={offferedItems}
          receiveItems={expectedItems}
          isGuaranteedPayment={isGuaranteedPayment}
        />
      </div>
      <Row gutter={24}>
        <Col
          span={isGuaranteedPayment ? 12 : 24}
          className="block float-left w-full pr-[20px] md:pr-[60px]"
        >
          <p className="text-3xl">Note</p>
          <p className="text-[16px] regular-text mt-[12px]">{note}</p>
          <p className="regular-text text-[14px] text-red300 mt-12">
            Expiration date: {expiredTime && expiredTime.toLocaleString()}
          </p>
        </Col>
        <Col
          span={isGuaranteedPayment ? 12 : 0}
          className="float-left w-full pl=[20px]"
        >
          <p className="text-3xl">Warranty</p>
          <div className="mt-[12px] flex items-center">
            <p className="regular-text text-[16px] float-left">
              Guaranteed payment amount:
            </p>
            <img
              src="/assets/images/solana-icon.svg"
              alt="Solana Icon"
              className="!w-[16px] h-[16px] ml-[12px] float-left"
            />
            <p className="ml-[12px] text-[16px] ml-[12px] float-left">
              {guaranteeSol} SOL
            </p>
          </div>
        </Col>
      </Row>
      <ConfirmedTransactionModal
        handleCancel={() => setModalOpened(false)}
        handleOk={() => setModalOpened(false)}
        isModalOpen={modalOpened}
      />
    </div>
  );
};
