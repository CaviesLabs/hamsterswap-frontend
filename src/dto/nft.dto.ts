import { ChainId } from "@/src/entities/chain.entity";

export enum NftStatus {
  transfer = "sold/transfer",
  holding = "holding",
}

/**
 * @dev Dto to get list nft.
 * @param {ChainId} chainId.
 * @param {string} walletAddress.
 */
export class GetListNftDto {
  chainId?: ChainId;
  walletAddress: string;
}

/**
 * @dev Dto to get nft detail.
 * @param {ChainId} chainId.
 * @param {string} contractAddress.
 * @param {string} tokenId.
 */
export class GetNftDto {
  chainId?: ChainId;
  tokenId?: string;
  contractAddress: string;
}

/**
 * @schema NftEntity
 * @dev The entity to store nft data.
 * @see src/dto/nft.dto.ts
 * @property {string} id.
 * @property {string} address.
 * @property {string} realAddress
 *  - If chain is not solana, this is the real address in evm
 *  - and the @var {string} address is the bridge address.
 * @property {number} chainId.
 * @property {string} collectionId.
 * @property {string} collectionSlug.
 * @property {boolean} isWhiteListed.
 * @property {string} image.
 * @property {string} name.
 * @property {AttributeDto[]} attributes.
 * @property {string} symbol.
 * @property {string} collectionName.
 * @property {number} decimal.
 * @property {NftStatus} status.
 */
export class NftEntity {
  id: string;
  address: string;
  realAddress: string;
  chainId: number;
  collectionId: string;
  collectionSlug: string | undefined;
  isWhiteListed: boolean;
  image: string;
  name: string;
  attributes: AttributeDto[];
  symbol?: string;
  collectionName?: string;
  decimal: 0;
  status: NftStatus.holding;
}

/**
 * @todo Remove this class after solscan api is ready.
 * @dev Solana nft entity.
 */
export class SolNftEntity {
  nft_address: string;
  nft_collection_name?: string;
  nft_name: string;
  nft_symbol: string;
  nft_status?: NftStatus;
  nft_collection_id: string;
  start_holding_time: number;
  stop_hodling_time: number;
  nft_last_traded_price: number;
  nft_listing_price: number;
  nft_image_uri: string;
  nft_image?: string;
  decimal?: number;
}

export class NftDto {
  list_nfts: NftEntity[];
  num_nfts: number;
  page: number;
  wallet_address?: string;
}

export type AttributeDto = {
  trait_type: string;
  value: string;
};

export class NftDetailDto {
  nft_address: string;
  nft_name: string;
  nft_symbol: string;
  nft_image: string;
  nft_collection_name: string;
  nft_collection_id: string;
  nft_solscan_collection_id: string;
  nft_attributes: {
    attributes: AttributeDto[];
    properties: any[];
    category: string;
  };
}
