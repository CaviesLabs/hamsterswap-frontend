import { RowNftItemProps } from "@/src/components/nfts";

/**
 * @dev Define value data to sort NFTs.
 */
export const sortOptions = [
  { value: "expired", name: "Expired" },
  { value: "success", name: "Success" },
  { value: "cancel", name: "Cancel" },
];

/**
 * @dev Define value datas to filter NFTs by category.
 */
export const categoryOptions = [
  { value: "top", name: "Top" },
  { value: "art", name: "Art" },
  { value: "collectibles", name: "Collectibles" },
  { value: "domain_names", name: "Domain Names" },
  { value: "music", name: "Music" },
  { value: "sports", name: "Sports" },
];

/**
 * @dev Define list of page which header will have purple background.
 */
export const PURPLE_HEADER_PAGES = [
  "proposal",
  "transaction",
  "create-proposal",
  "profile",
];

/**
 * @dev Swap options.
 */
export const swapOptions: RowNftItemProps[] = [
  {
    name: "#911",
    collection: "Maya Spirits",
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
    collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
    assetType: "nft",
  },
  {
    name: "#911",
    collection: "Maya Spirits",
    image:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nftId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
    collectionId: "0xbf69783fa630ed65d396dca51216a391a4bb1fd0",
    assetType: "game",
  },
  {
    name: "2000 UDD",
    collection: "Paypal",
    image: "/assets/images/asset-cash.png",
    assetType: "usd",
  },
];
