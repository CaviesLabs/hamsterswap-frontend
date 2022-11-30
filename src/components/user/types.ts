import { ProposalItemProps } from "@/src/components/proposal-item";

export type BreadcrumbProps = {
  title: string;
};

export type SubMenuProps = {
  curTab: number;
};

type ProposalStatus = "pending" | "success" | "canceled" | "expired";
export type ProposalDetailProps = ProposalItemProps & {
  status: ProposalStatus;
};

export type ProposalItem = {
  id: string;
  createdAt: string;
  swapItems: any[];
  receiveItems: any[];
  swapper: string;
  status: ProposalStatus;
};

export type ProposalHistoryProps = {
  data: ProposalItem;
};
