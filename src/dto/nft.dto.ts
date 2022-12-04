/**
 * @dev Define list nft dto
 */
export class GetListNftDto {
  walletAddress: string;
}

export class NftDto {
  list_nfts: any[];
  num_nfts: number;
  page: number;
}
