import { BN } from "@project-serum/anchor";

/** @dev Expose stuff item. */
export class StuffItemEntity {
  id: string;
  mintAccount: string;
  amount: BN;
}

/** @dev Expose dto to create proposal on-chain. */
export class CreateProposalDto {
  /** @dev Proposal ID, call create-proposal to API to get ID first. */
  id: string;

  /** @dev Nfts which user want to wrap to revice. */
  swapOptions: StuffItemEntity[];

  /** @dev Nfts whose user want to wrap. */
  offeredOptions: StuffItemEntity[];

  /** @dev This proposal will be expired in this time. */
  expiredAt: BN;
}
