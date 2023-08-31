import { NftEntity } from "@/src/dto/nft.dto";
import {
  SwapItemType,
  type SwapItemInfo,
} from "@/src/entities/proposal.entity";

/** @dev Define common props. */
export type RowNftItemProps = SwapItemInfo & {
  tokenAmount?: number;
};

/** @dev Define props for specific nft item which is editable. */
export type RowNftEditItemProps = NftEntity & {
  assetType?: SwapItemType;
  tokenAmount?: number;
  onDelete(): void;
};
