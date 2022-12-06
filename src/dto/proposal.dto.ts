export type ProposalStatusDto = "pending" | "success" | "canceled" | "expired";
/**
 * @dev Define create proposal dto
 */
export class CreateProposalDto {
  // createdAt: string;
  swapItems: any[];
  receiveItems: any[];
  // swapper: string;
  // status: ProposalStatusDto;
}

export class ProposalDto extends CreateProposalDto {
  // id: string;
}

enum ProposalStatuses {
  "SWAP_PROPOSAL_STATUS::CREATED",
  "SWAP_PROPOSAL_STATUS::DEPOSITED",
  "SWAP_PROPOSAL_STATUS::FULFILLED",
  "SWAP_PROPOSAL_STATUS::CANCELED",
}

export class GetListProposalDto {
  ownerAddresses: string[];
  statuses: ProposalStatuses[];
  limit: number;
  offset: number;
  search: string;
}
