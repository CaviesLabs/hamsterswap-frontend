/**
 * @dev Define list nft dto
 */
export class ListNftDto {
  address: string;
}

export class NftDto extends ListNftDto {
  id: string;
}
