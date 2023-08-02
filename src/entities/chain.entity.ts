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
 * @type ChainEntity
 * @dev Export chain entity.
 * @note This is the chain entity.
 * @see src/entities/chain.entity.ts
 */
export type ChainEntity = {
  chainId: ChainId;
  logo: string;
  name: string;
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
  },
  {
    chainId: ChainId.klaytn,
    logo: "https://assets.coingecko.com/coins/images/9672/small/klaytn.png?1660288824",
    name: "KLAYTN",
  },
] as ChainEntity[];
