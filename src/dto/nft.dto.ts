export enum NftStatus {
  transfer = "sold/transfer",
  holding = "holding",
}

/**
 * @dev Define list nft dto
 */
export class GetListNftDto {
  walletAddress: string;
}

export class GetNftDto {
  mintAddress: string;
}

export class NftEntity {
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
