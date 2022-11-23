import { FC } from "react";
import { StyledReputationCard } from "./reputation.card.style";

export const ReputationCard: FC = () => {
  return (
    <StyledReputationCard className="flex items-center px-[10px] py-[8px] rounded-[100px]">
      <img
        src="/assets/images/verify-icon.svg"
        alt="repuation icon"
        className="w-[14px] h-[14px] mr-[7px]"
      />
      <span className="text-white text-[12px] semi-bold">Reputation</span>
    </StyledReputationCard>
  );
};
