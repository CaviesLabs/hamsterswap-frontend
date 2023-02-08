import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { NftEntity } from "@/src/dto/nft.dto";

/**
 * @dev Expose asset types enum for UI handling.
 */
export enum AssetTypes {
  nft = "nft",
  game = "game",
  usd = "usd",
  token = "currency",
}

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
  CASH = "SWAP_ITEM_TYPE::CASH",
}

/**
 * @dev Expose enum of proposal status.
 */
export enum SwapItemStatus {
  CREATED = "SWAP_ITEM_STATUS::CREATED",
  DEPOSITED = "SWAP_ITEM_STATUS::DEPOSITED",
  FULFILLED = "SWAP_ITEM_STATUS::FULFILLED",
  CANCELED = "SWAP_ITEM_STATUS::CANCELED",
}

/** @dev Expose stuff item. */
export class StuffItemEntity {
  id: string;
  mintAccount: PublicKey;
  amount: BN;
  itemType: {
    [key: string]: any;
  };
}

/**
 * @dev Use this entity to show in UI
 * */
export type OfferedItemEntity = Omit<NftEntity, `id`> &
  StuffItemEntity & {
    /**
     * @dev On-chain id of token in SolScan.
     */
    nftId: string;

    /**
     * @dev AssetTypes in SolScan.
     */
    assetType: SwapItemType;

    /**
     * @dev Use this to display WSOL amount
     */
    tokenAmount?: number;
  };

export type ExpectedItemEntity = Omit<NftEntity, `id`> &
  StuffItemEntity & {
    /**
     * @dev On-chain id of token in SolScan.
     */
    nftId: string;

    /**
     * @dev AssetTypes in SolScan.
     */
    assetType: SwapItemType;

    /**
     * @dev Use this to display WSOL amount
     */
    tokenAmount?: number;
  };

/**
 * @dev Use this for expected opinions in UI
 */
export interface ExpectedOpitionEntity {
  /**
   * @dev Must generate first.
   */
  id: string;
  askingItems: ExpectedItemEntity[];
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
  ACTIVE = "SWAP_PROPOSAL_STATUS::ACTIVE",
  SWAPPED = "SWAP_PROPOSAL_STATUS::SWAPPED",
  DEPOSITED = "SWAP_PROPOSAL_STATUS::DEPOSITED",
  FULFILLED = "SWAP_PROPOSAL_STATUS::FULFILLED",
  CANCELED = "SWAP_PROPOSAL_STATUS::CANCELED",
  REDEEMED = "SWAP_PROPOSAL_STATUS::REDEEMED",
  WITHDRAWN = "SWAP_PROPOSAL_STATUS::WITHDRAWN",
  EXPIRED = "SWAP_PROPOSAL_STATUS::EXPIRED",
}

class TokenEntity {
  /**
   * @dev Blockchain address of token.
   */
  address: string;

  /**
   * @dev The decimal value of token.
   */
  decimals: number;

  /**
   * @dev Number of holder.
   */
  holder: number;

  /**
   * @dev The image uri present for nft.
   */
  icon: string;

  /**
   * @dev Name of token.
   */
  name: string;

  /**
   * @dev It mean collection name of nft or token.
   */
  symbol: string;
}

/**
 * @dev Expose interface for swap item.
 * */
export class SwapItemEntity {
  /**
   * @dev Address to owner of swap item.
   */
  ownerAddress?: string;

  /**
   * @dev Condition whether swap item is nft or token currency.
   */
  type: SwapItemType;

  /**
   * @dev Address of token.
   */
  contractAddress: string;

  /**
   * @dev The address which token was deposited to.
   */
  depositedAddress?: string;

  /**
   * @dev Amount of swap item which owner already configured when create proposal.
   */
  amount: number;

  /**
   * @dev The status of swap item whether deposited or withdraw.
   */
  status: SwapItemStatus;

  /**
   * @dev The uri to meta data of token.
   */
  nftMetadata?: NftEntity & TokenEntity;

  /**
   * @dev The unique id of swap item.
   */
  id: string;
}

/**
 * @dev Expose interface swap option.
 */
export class SwapOptionEntity {
  /**
   * @dev The created date.
   */
  createdAt: string;

  /**
   * @dev The deleted date.
   */
  deletedAt: string;

  /**
   * @dev The unique id of swap option.
   */
  id: string;

  /**
   * @dev The array contains swap items in option.
   */
  items: SwapItemEntity[];
}

/**
 * @dev Response dto when create new proposal from hamsterbox server.
 * @dev Expose interface for swap proposal entity.
 */
export class SwapProposalEntity {
  /**
   * @dev The unique id of proposal.
   */
  id: string;

  /**
   * @dev The index number of proposal in database.
   */
  numberId: number;

  /**
   * @dev The id of user who created this proposal.
   */
  ownerId: string;

  /**
   * @dev The wallet address of user who created this proposal.
   */
  ownerAddress: string;

  /**
   * @dev The wallet address of user who created this proposal.
   */
  owner?: string;

  /**
   * @dev Offer items belongs to owner which user want to transfer.
   */
  offerItems: SwapItemEntity[] = [];

  /**
   * @dev Swap options which user want to reicive.
   */
  swapOptions: SwapOptionEntity[] = [];

  /**
   * @dev The id of user who buy proposal/
   */
  fulfillBy?: string;

  /**
   * @dev The id of user who buy proposal/
   */
  fulfillByUserId?: string;

  /**
   * @dev The id of option which user choosen before to buy proposal/
   */
  fulfilledWithOptionId?: string;

  /**
   * @dev The expired time of this proposal.
   */
  expiredAt: Date;

  /**
   * @dev The status of this proposal.
   */
  status: SwapProposalStatus;

  /**
   * @dev The specific keywords to search for looking this proposal.
   */
  searchText?: string;

  /**
   * @dev The description of this proposal
   */
  note?: string;

  /**
   * @dev The created time of this proposal.
   */
  createdAt: Date;

  /**
   * @dev The updated time of this proposal.
   */
  updatedAt: Date;
}

/**
 * @dev Dto to get proposals by walletOwner.
 */
export class GetProposalsDto {
  /**
   * @dev Use this to find proposals which owned by wallet address.
   */
  walletAddress?: string;

  /**
   * @dev Option to find.
   */
  options?: {
    /**
     * @dev Set it is true if want to find history of buyer.
     */
    countParticipation?: boolean;

    /**
     * @dev Proposal statuses.
     */
    statuses?: SwapProposalStatus[] | SwapProposalStatus;

    /**
     * @dev The limit of proposal want to find.
     */
    limit?: number;

    /**
     * @dev The length of proposal.
     */
    offset?: number;

    /**
     * @dev Specific words in note which want to looking.
     */
    search?: string;
  };
}
