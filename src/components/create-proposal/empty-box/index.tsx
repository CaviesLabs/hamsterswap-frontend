import { FC } from "react";
import { EmptyBoxProps } from "@/src/components/create-proposal/empty-box/types";
import { Col } from "antd";

export const EmptyBox: FC<EmptyBoxProps> = (props) => {
  const { existsAmount } = props;

  return (
    <>
      {Array.from(Array(4 - existsAmount).keys()).map((i) => {
        return (
          <Col
            span={12}
            className="block w-full md:w-[50%]"
            key={`swapoptions-empty-${i}`}
          >
            <div className="flex">
              <p className="text-[16px] text-gray-400 regular-text">
                Item #{existsAmount + i + 1}
              </p>
            </div>
            <div className="pt-[16px]">
              <div className="bg-dark10 border border-dashed border-1 border-[#94A3B8] rounded-2xl h-[112px]"></div>
            </div>
          </Col>
        );
      })}
    </>
  );
};
