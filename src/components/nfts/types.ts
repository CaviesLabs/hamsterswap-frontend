import { NftEntity } from "@/src/dto/nft.dto";
import { SwapItemType } from "@/src/entities/proposal.entity";

/** @dev Define common props. */
export type RowNftItemProps = NftEntity & {
  assetType: SwapItemType;
  tokenAmount?: number;
};

/** @dev Define props for specific nft item which is editable. */
export type RowNftEditItemProps = RowNftItemProps & {
  onDelete(): void;
};
