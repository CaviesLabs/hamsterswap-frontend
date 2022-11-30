import { FC } from "react";
import { ProposalItem } from "@/src/components/proposal-item";
import { Col, Row } from "antd";

export const Step5: FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Confirm
      </h3>
      <div className="block mt-[60px] flex">
        <ProposalItem />
      </div>
      <Row gutter={24}>
        <Col
          span={12}
          className="block float-left w-full pr-[20px] md:pr-[60px]"
        >
          <p className="text-3xl">Note</p>
          <p className="text-[16px] regular-text mt-[12px]">
            Lorem ipsum dolor sit amet consectetur. Dignissim elementum
            pellentesque tristique purus felis eget non nunc. Vitae nisl amet
            sed non in scelerisque. Platea ac ut donec cras non nisl. Nec arcu
            gravida tellus mattis.
          </p>
          <p className="regular-text text-[14px] text-red300 mt-12">
            Expiration date: Nov, 2022 11:06
          </p>
        </Col>
        <Col span={12} className="float-left w-full pl=[20px]">
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
              2,043.54 SOL
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};
