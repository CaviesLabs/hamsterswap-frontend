import {
  OfferedItemEntity,
  ExpectedOpitionEntity,
} from "@/src/entities/proposal.entity";

export type ProposalItemProps = {
  className?: string;
  isGuaranteedPayment?: boolean | false;
  swapItems: OfferedItemEntity[];
  receiveItems: ExpectedOpitionEntity[];
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: any[];
  userLookingFor: any[];
};
