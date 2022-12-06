import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

/**
 * @dev Exporse item action type.
 */
export enum SwapItemActionType {
  depositing = "depositing",
  withdrawing = "withdrawing",
  fulfilling = "fulfilling",
  redeeming = "redeeming",
}

/** @dev Expose enum for item type. */
export enum SwapItemType {
  NFT = "SWAP_ITEM_TYPE::NFT",
  GAME = "SWAP_ITEM_TYPE::GAME",
  CURRENCY = "SWAP_ITEM_TYPE::CURRENCY",
}

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
  swapOptions: { id: string; askingItems: StuffItemEntity[] }[];

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

export enum SwapProposalStatus {
  CREATED = "SWAP_PROPOSAL_STATUS::CREATED",
  DEPOSITED = "SWAP_PROPOSAL_STATUS::DEPOSITED",
  FULFILLED = "SWAP_PROPOSAL_STATUS::FULFILLED",
  CANCELED = "SWAP_PROPOSAL_STATUS::CANCELED",
}

/**
 * @dev Expose interface for swap item.
 * */
export class SwapItemEntity {
  ownerAddress?: string;

  type: SwapItemType;

  contractAddress: string;

  depositedAddress?: string;

  amount: number;

  status: SwapItemStatus;

  nftMetadata?: any;

  id: string;
}

/**
 * @dev Expose interface swap option.
 */
export class SwapOptionEntity {
  createdAt: string;
  deletedAt: string;
  id: string;
  items: SwapItemEntity[];
}

/**
 * @dev Response dto when create new proposal from hamsterbox server.
 * @dev Expose interface for swap proposal entity.
 */
export class SwapProposalEntity {
  id: string;

  ownerId: string;

  ownerAddress: string;

  offerItems: SwapItemEntity[] = [];

  swapOptions: SwapOptionEntity[] = [];

  fulfillBy?: string;

  fulfilledWithOptionId?: string;

  expiredAt: Date;

  status: SwapProposalStatus;

  searchText?: string;

  note?: string;
}

/**
 * @dev Dto to get proposals by walletOwner.
 */
export class GetProposalsDto {
  walletAddress: string;
  options?: {
    statuses: SwapProposalStatus;
    limit: number;
    offset: number;
    search: string;
  };
}
