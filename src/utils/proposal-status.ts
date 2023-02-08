import { SwapProposalStatus } from "@/src/entities/proposal.entity";

export const getStatus = (status: SwapProposalStatus) => {
  switch (status) {
    case SwapProposalStatus.CANCELED:
    case SwapProposalStatus.WITHDRAWN:
      return "Canceled";
    case SwapProposalStatus.DEPOSITED:
      return "Deposited";
    case SwapProposalStatus.FULFILLED:
    case SwapProposalStatus.REDEEMED:
      return "Success";
    case SwapProposalStatus.CREATED:
      return "Created";
    default:
      return "";
  }
};
