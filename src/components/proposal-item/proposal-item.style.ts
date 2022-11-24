import styled from "@emotion/styled";
import { ProposalItemProps } from "./types";

export const StyledProposalItem = styled.div<ProposalItemProps>`
  position: relative;
  ${(props: ProposalItemProps) => {
    if (props.userInfoHidden) return;
    return `
      &::before {
        position: absolute;
        top: 81px;
        right: -1px;
        content: "";
        background: linear-gradient(90deg, #1eb130 0%, #1ea866 100%);
        height: 28px;
        width: 28px;
        transform: rotate(45deg);
      }
    
      &::after {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        position: absolute;
        content: attr(data-label);
        top: 31px;
        right: -7px;
        padding: 0.5rem 80px;
        width: 13rem;
        background: linear-gradient(90deg, #1eb130 0%, #1ea866 100%);
        color: white;
        text-align: center;
        font-family: "Roboto", sans-serif;
        box-shadow: 4px 4px 15px rgb(26 35 126 / 20%);
        border-bottom-right-radius: -9px;
        text-align: start;
        font-weight: bold;
        padding-right: 120px;
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
