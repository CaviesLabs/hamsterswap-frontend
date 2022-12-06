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
