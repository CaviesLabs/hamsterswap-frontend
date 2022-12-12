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
            className="block w-full md:w-[50%]"
            key={`swapoptions-empty-${i}`}
          >
            <div className="flow-root items-center h-[50px]">
              <p
                className="text-[16px] float-left text-gray-400 regular-text"
                style={{ transform: "translateY(50%)" }}
              >
                Item #{existsAmount + i + 1}
              </p>
            </div>
            <div className="pt-[20px]">
              <div className="bg-dark10 border border-dashed border-1 border-[#94A3B8] rounded-2xl h-[112px]"></div>
            </div>
          </Col>
        );
      })}
    </>
  );
};
