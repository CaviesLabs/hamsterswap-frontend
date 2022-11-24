/** @dev Define common props. */
export type RowNftItemProps = {
  image: string;
  name: string;
  collection: string;
  collectionId: string;
  nftId: string;
};

/** @dev Define props for specific nft item which is editable. */
export type RowNftEditItemProps = RowNftItemProps & {
  onDelete(): void;
};
