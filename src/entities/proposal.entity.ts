import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

/**
 * @dev Expose enum of proposal status.
 */
export enum SwapItemStatus {
  CREATED = "SWAP_ITEM_STATUS::CREATED",
  DEPOSITED = "SWAP_ITEM_STATUS::DEPOSITED",
  REDEEMED = "SWAP_ITEM_STATUS::REDEEMED",
  WITHDRAWN = "SWAP_ITEM_STATUS::WITHDRAWN",
}

/** @dev Expose stuff item. */
export class StuffItemEntity {
  id: string;
  mintAccount: PublicKey;
  amount: BN;
  itemType: any;
}

/** @dev Expose dto to create proposal on-chain. */
export class CreateProposalDto {
  /**
   * @dev Proposal ID, call create-proposal to API to get ID first.
   * */
  id: string;

  /**
   * @dev Nfts which user want to wrap to revice.
   * */
  swapOptions: StuffItemEntity[];

  /**
   * @dev Nfts whose user want to wrap.
   * */
  offeredOptions: StuffItemEntity[];

  /**
   * @dev This proposal will be expired in this time.
   * */
  expiredAt: any;
}

/**
 * @dev Expose dto to create proposal backend.
 * */
export type CreateProposalToServerDto = Omit<
  CreateProposalDto,
  "id" | "expiredAt"
> & {
  /**
   * @dev Wallet address of owner proposal.
   */
  ownerAddress: string;

  /**
   * @dev Proposal description.
   */
  note: string;

  /**
   * @dev Expired date in date type.
   */
  expiredAt: Date;
};

/**
 * @dev Response dto when create new proposal from hamsterbox server.
 */
export class CreateProposalServerResponse {
  id: string;
  ownerId: string;
  ownerAddress: string;
  offerItems: any[];
  swapOptions: any[];
  fulfillBy: string;
  fulfilledWithOptionId: string;
  expireAt: string;
  status: SwapItemStatus;
  searchText: string;
  note: string;
}