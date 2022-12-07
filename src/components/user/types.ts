import { ProposalItemProps } from "@/src/components/proposal-item";
import { SwapItemStatus } from "@/src/entities/proposal.entity";

export type BreadcrumbProps = {
  title: string;
};

export type SubMenuProps = {
  curTab: number;
};

type ProposalStatus = "pending" | "success" | "canceled" | "expired";
export type ProposalDetailProps = ProposalItemProps & {
  status: SwapItemStatus;
};

export type ProposalItem = {
  id: string;
  createdAt: string;
  swapItems: any[];
  receiveItems: any[];
  swapper: string;
  status: ProposalStatus;
};

export type ProposalReducer = {
  swapItems: any[];
  receiveItems: any[];
};

export type ProposalHistoryProps = {
  data: ProposalItem;
};

type PaymentType = "stripe" | "paypal" | "bank";

export type PaymentItem = {
  type: PaymentType;
  label: string;
  name: string;
  detail: string;
};
