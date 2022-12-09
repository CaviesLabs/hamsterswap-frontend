import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { RowNftItemProps } from "@/src/components/nfts";

export type ProposalItemProps = {
  className?: string;
  isGuaranteedPayment?: boolean | false;
  swapItems?: RowNftItemProps[];
  receiveItems?: RowNftItemProps[][];
  data?: SwapProposalEntity;
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: any[];
  userLookingFor: any;
};
