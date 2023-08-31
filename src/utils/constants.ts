import { hProfileDto } from "@/src/dto/hProfile.dto";
import { RowNftItemProps } from "../components/nfts";
import { SwapProposalStatus } from "../entities/proposal.entity";
// import { SwapItemType } from "../entities/proposal.entity";

/**
 * @dev Define value data to sort NFTs.
 */
export const sortOptions = [
  { value: SwapProposalStatus.ACTIVE, name: "Active" },
  { value: SwapProposalStatus.EXPIRED, name: "Expired" },
  { value: SwapProposalStatus.REDEEMED, name: "Completed" },
  { value: SwapProposalStatus.WITHDRAWN, name: "Withdrawn" },
  { value: SwapProposalStatus.SWAPPED, name: "Swapped" },
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

export const SIGN_MESSAGE =
  "Welcome to HamsterSwap!\n" +
  "\n" +
  "Approve to sign in.\n" +
  "\n" +
  "This request will not trigger a blockchain transaction or cost any gas fees.\n" +
  "\n" +
  "Your authentication status will reset after 24 hours.";

// export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm (UTC)";
export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss (UTC)";

export const WSOL_ADDRESS = "So11111111111111111111111111111111111111112";
export const BONK_ADDRESS = "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263";
export const USDC_ADDRESS = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

/**
 * @dev Define dummy data for profile.
 * @todo Remove this when API is ready.
 */
export const DUMMY_PROFILES: hProfileDto[] = [
  {
    id: "12345678",
    avatar: "https://i.imgflip.com/648kob.jpg",
    walletAddress: "0x1234567890abcdef",
    ordersStat: {
      completedOrders: 10,
      orders: 15,
    },
    telegram: "@dummyuser1",
    twitter: "@dummyuser1_twitter",
  },
  {
    id: "abcdefgh",
    avatar: "https://i.imgflip.com/648kob.jpg",
    walletAddress: "0xabcdef1234567890",
    ordersStat: {
      completedOrders: 5,
      orders: 8,
    },
    telegram: "@dummyuser2",
    twitter: "@dummyuser2_twitter",
  },
  {
    id: "a1b2c3d4",
    avatar: "https://i.imgflip.com/648kob.jpg",
    walletAddress: "0x9876543210abcdef",
    ordersStat: {
      completedOrders: 20,
      orders: 22,
    },
    telegram: "@dummyuser3",
    twitter: "@dummyuser3_twitter",
  },
];

/**
 * @dev Define dummy data for NFTs.
 * @todo Remove this when API is ready.
 */
export const DUMMY_NFTS: RowNftItemProps[] = [
  // {
  //   image: "https://i.imgflip.com/648kob.jpg",
  //   name: "NFT Artwork 1",
  //   collectionName: "Art Collection",
  //   collectionId: "collection_123",
  //   nftId: "nft_456",
  //   assetType: SwapItemType.NFT,
  //   nftAddress: "0x123abc",
  //   tokenAmount: undefined, // No token amount for NFTs
  // },
  // {
  //   image: "https://i.imgflip.com/648kob.jpg",
  //   name: "NFT Artwork 2",
  //   collectionName: "Fantasy Collection",
  //   collectionId: "collection_789",
  //   nftId: "nft_1011",
  //   assetType: SwapItemType.NFT,
  //   nftAddress: "0xdef456",
  //   tokenAmount: undefined, // No token amount for NFTs
  // },
  // {
  //   image: "https://i.imgflip.com/648kob.jpg",
  //   name: "NFT Artwork 3",
  //   collectionName: "Digital Art Collection",
  //   collectionId: "collection_1213",
  //   nftId: "nft_1415",
  //   assetType: SwapItemType.NFT,
  //   nftAddress: "0xghijk",
  //   tokenAmount: undefined, // No token amount for NFTs
  // },
  // {
  //   image: "https://i.imgflip.com/648kob.jpg",
  //   name: "ERC20 Token 1",
  //   collectionName: "Token Collection",
  //   collectionId: "collection_1617",
  //   id: undefined, // Not an NFT, no NFT ID
  //   assetType: SwapItemType.NFT,
  //   address: undefined, // Not an NFT, no NFT address
  //   tokenAmount: 100, // Display WSOL amount for the ERC20 token
  // },
];
