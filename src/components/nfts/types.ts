import { SwapItemType } from "@/src/entities/proposal.entity";

/** @dev Define common props. */
export type RowNftItemProps = {
  image: string;
  name: string;
  collection: string;
  collectionId?: string;
  nftId?: string;
  assetType: SwapItemType;
  nftAddress?: string;
  /**
   * @dev Use this to display WSOL amount
   */
  tokenAmount?: number;
};

/** @dev Define props for specific nft item which is editable. */
export type RowNftEditItemProps = RowNftItemProps & {
  onDelete(): void;
};
