import { FC } from "react";

export const ReputationCard: FC = () => {
  return (
    <div
      className="flex items-center px-[10px] py-[8px] rounded-[100px]"
      style={{
        background: "linear-gradient(83.34deg, #FD9211 -5.88%, #F75D06 100%);",
      }}
    >
      <img
        src="/assets/images/verify-icon.svg"
        alt="repuation icon"
        className="w-[14px] h-[14px] mr-[7px]"
      />
      <span className="text-white text-[12px] semi-bold">Reputation</span>
    </div>
  );
};
