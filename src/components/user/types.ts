import { ProposalItemProps } from "@/src/components/proposal-item";

export type BreadcrumbProps = {
  title: string;
};

export type SubMenuProps = {
  curTab: number;
};

export type ProposalDetailProps = ProposalItemProps & {
  status: "pending" | "success" | "canceled" | "expired";
};
