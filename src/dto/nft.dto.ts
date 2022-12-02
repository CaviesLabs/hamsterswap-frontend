/**
 * @dev Define list nft dto
 */
export class GetListNftDto {
  address: string;
}

export class NftDto extends GetListNftDto {
  id: string;
}
