import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { RowNftItemProps } from "@/src/components/nfts";

export type ProposalItemProps = {
  className?: string;
  isGuaranteedPayment?: boolean | false;
  swapItems?: RowNftItemProps[];
  receiveItems?: RowNftItemProps[][];
  data?: SwapProposalEntity;
  changeOption?: (value: number) => void;
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: any[];
  userLookingFor: any;
  fulfilledWithOptionId?: string;
};
