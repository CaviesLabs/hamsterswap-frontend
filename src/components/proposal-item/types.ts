import {
  SwapProposalEntity,
  SwapItemInfo,
} from "@/src/entities/proposal.entity";

export type ProposalItemProps = {
  changeOption?: (value: number) => void;
  className?: string;
  isGuaranteedPayment?: boolean | false;
  data?: SwapProposalEntity;
  swapItems?: SwapItemInfo[]; // Item of user.
  receiveItems?: { id: string; items: SwapItemInfo[] }[];
};

export type ProposalItemsProps = {
  className?: string;
  userAssets: SwapItemInfo[];
  userLookingFor: { id: string; items: SwapItemInfo[] }[];
  fulfilledWithOptionId?: string;
};
