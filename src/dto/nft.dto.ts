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
  collectionId?: string;
  collectionSlug?: string | undefined;
  collectionUrl?: string;
  collectionName?: string;
  isWhiteListed: boolean;
  image: string;
  name: string;
  attributes: AttributeDto[];
  symbol?: string;
  decimal: 0;
  status: NftStatus.holding;
}

/**
 * @schema TokenEntity
 * @notice TokenEntity represents a token entity.
 * @property {chainId} The chain id.
 * @property {name} The name of the token.
 * @property {symbol} The symbol of the token.
 * @property {decimals} The decimals of the token.
 * @property {contractAddress} The contract address of the token.
 * @property {isGasToken} The boolean to check if the token is a gas token.
 * @property {recommended} The boolean to check if the token is recommended.
 * @property {coingeckoId} The coingecko id of the token.
 * @property {logo} The logo of the token.
 * @property {unOfficial} The boolean to check if the token is unOfficial.
 */
export class TokenEntity {
  chainId: ChainId;
  name: string;
  symbol: string;
  decimals: number;
  contractAddress: string;
  isGasToken: boolean;
  recommended?: boolean;
  coingeckoId?: string;
  logo?: string;
  unOfficial?: true; // TODO: TEST
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
