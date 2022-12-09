import { ProposalItemProps } from "@/src/components/proposal-item";
import {
  SwapProposalEntity,
  SwapProposalStatus,
} from "@/src/entities/proposal.entity";

export type BreadcrumbProps = {
  title: string;
};

export type SubMenuProps = {
  curTab: number;
};

type ProposalStatus = "pending" | "success" | "canceled" | "expired";
export type ProposalDetailProps = ProposalItemProps & {
  proposalId: string;
  proposalOwner: string;
  status: SwapProposalStatus;
};

export type ProposalItem = {
  id: string;
  createdAt: string;
  offerItems: any[];
  swapOptions: any[];
  swapper: string;
  status: ProposalStatus;
};

export type ProposalHistoryProps = {
  data: SwapProposalEntity;
};

type PaymentType = "stripe" | "paypal" | "bank";

export type PaymentItem = {
  type: PaymentType;
  label: string;
  name: string;
  detail: string;
};
