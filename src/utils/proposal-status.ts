import { SwapProposalStatus } from "@/src/entities/proposal.entity";

export const getStatus = (status: SwapProposalStatus) => {
  switch (status) {
    case SwapProposalStatus.CANCELED:
      return "Cancel";
    case SwapProposalStatus.DEPOSITED:
      return "Deposited";
    case SwapProposalStatus.FULFILLED:
      return "Success";
    case SwapProposalStatus.CREATED:
      return "Created";
    default:
      return "Not defined";
  }
};
