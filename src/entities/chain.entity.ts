/**
 * @enum ChainId
 * @dev Export chain id.
 * @note This is the chain id.
 * @see src/entities/chain.entity.ts
 */
export enum ChainId {
  solana = "solana",
  klaytn = "klaytn",
}

/**
 * @enum IdpShortName
 * @dev Export idp short name.
 * @note This is the idp short name.
 * @see src/entities/chain.entity.ts
 */
export enum IdpShortName {
  EVMWallet = "evm-wallet",
  SolanaWallet = "solana-wallet",
  Google = "google",
  Web3Auth = "web3-auth",
  MagicLink = "magic-link",
}

/**
 * @type IdpShortNameMap
 * @dev Export idp short name map.
 * @note This is the idp short name map.
 * @see src/entities/chain.entity.ts
 */
export const IdpShortNameMap: Record<ChainId, IdpShortName> = {
  [ChainId.solana]: IdpShortName.SolanaWallet,
  [ChainId.klaytn]: IdpShortName.EVMWallet,
};
/**
 * @type ChainEntity
 * @dev Export chain entity.
 * @note This is the chain entity.
 * @see src/entities/chain.entity.ts
 */
export type ChainEntity = {
  chainId: ChainId;
  logo: string;
  name: string;
  rpcUrl: string;
};

/**
 * @constant DEFAULT_CHAINS
 * @dev Export default chains.
 * @note This is the default chains.
 * @see src/entities/chain.entity.ts
 */
export const DEFAULT_CHAINS = [
  {
    chainId: ChainId.solana,
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    name: "SOLANA",
    rpcUrl:
      "https://silent-twilight-wildflower.solana-mainnet.quiknode.pro/82f3034e016e3b800a8e2fc6d00efe9e270c046b/",
  },
  // {
  //   chainId: ChainId.klaytn,
  //   logo: "https://assets.coingecko.com/coins/images/9672/small/klaytn.png?1660288824",
  //   name: "KLAYTN",
  //   rpcUrl: "https://klaytn.api.onfinality.io/public",
  // },
] as ChainEntity[];
