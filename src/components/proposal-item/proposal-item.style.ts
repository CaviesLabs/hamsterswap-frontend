import styled from "@emotion/styled";
import { ProposalItemProps } from "./types";

export const StyledProposalItem = styled.div<ProposalItemProps>`
  position: relative;
  ${(props: ProposalItemProps) => {
    if (!props.isGuaranteedPayment) return;
    return `
      &::before {
        position: absolute;
        top: 59px;
        right: -1px;
        content: "";
        background: linear-gradient(90deg, #1eb130 0%, #1ea866 100%);
        height: 28px;
        width: 28px;
        transform: rotate(45deg);
      }
    
      &::after {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-left-radius: 8px;
        position: absolute;
        content: attr(data-label);
        top: 41px;
        right: -7px;
        padding: 10px 0px 10px 35px;
        width: 127px;
        background: linear-gradient(90deg, #1eb130 0%, #1ea866 100%);
        color: white;
        text-align: center;
        font-size: 11px;
        font-family: "Roboto", sans-serif;
        border-bottom-right-radius: -9px;
        text-align: start;
        font-weight: bold;
        font-size: 14px;
        line-height: 12px;
        text-transform: uppercase;
      }
    
      @media screen and (max-width: 768px) {
        &::after {
          right: initial;
          left: -7px;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom-left-radius: 0px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          border-top-left-radius: 20px;
        }
        &::before {
          right: initial;
          left: -1px;
        }
      }
    `;
  }}
`;
