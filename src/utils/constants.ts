/**
 * @dev Define value data to sort NFTs.
 */
export const sortOptions = [
  { value: "expired", name: "Expired" },
  { value: "success", name: "Successful" },
  { value: "cancel", name: "Canceled" },
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

export const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm (UTC)";

export const WSOL_ADDRESS = "So11111111111111111111111111111111111111112";
