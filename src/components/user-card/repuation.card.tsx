import { FC } from "react";
import styled from "@emotion/styled";

/** @dev Define styled component. */
export const StyledReputationCard = styled.div`
  background: linear-gradient(83.34deg, #fd9211 -5.88%, #f75d06 100%);
  display: inline-flex;
`;

export const ReputationCard: FC = () => {
  return (
    <StyledReputationCard className="flex items-center px-[10px] py-[3px] rounded-[100px]">
      <img
        src="/assets/images/verify-icon.svg"
        alt="repuation icon"
        className="w-[14px] h-[14px] mr-[4px]"
      />
      <span className="text-white text-[12px] semi-bold">Pro</span>
    </StyledReputationCard>
  );
};
