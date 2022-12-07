import {
  OfferedItemEntity,
  ExpectedOpitionEntity,
  SwapOptionEntity,
  SwapItemEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";

export type ProposalItemProps = {
  className?: string;
  isGuaranteedPayment?: boolean | false;
  swapItems?: OfferedItemEntity[];
  receiveItems?: ExpectedOpitionEntity[];
  data?: SwapProposalEntity;
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: SwapItemEntity[];
  userLookingFor: SwapOptionEntity[];
};
