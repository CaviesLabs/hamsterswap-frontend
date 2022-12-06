import { SwapProposalEntity } from "@/src/entities/proposal.entity";

export type ProposalItemProps = {
  className?: string;
  isGuaranteedPayment?: boolean | false;
  swapItems: any[];
  receiveItems: any[];
  data?: SwapProposalEntity;
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: any[];
  userLookingFor: any[];
};
