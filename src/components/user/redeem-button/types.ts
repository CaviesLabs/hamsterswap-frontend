import { SwapProposalStatus } from "@/src/entities/proposal.entity";

export type RedeemButtonProps = {
  proposalId: string;
  status: SwapProposalStatus;
};
