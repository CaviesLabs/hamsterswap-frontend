import { ChainId } from "./chain.entity";

/**
 * @dev The interface of currency which hamster allow to use.
 */
export type TokenEntity = {
  explorerUrl: string;
  currencyId: string;
  address: string;
  icon: string;
  image?: string; // For solana schema, @todo Remove it later.
  name: string;
  symbol: string;
  isNativeToken?: boolean;
  realAddress?: string;
  decimals: number;
  realDecimals?: number;
};

/**
 * @dev The interface of nft collection which hamster allow to use.
 */
export type allowNTFCollection = {
  addresses: string[];
  marketUrl: string;
  icon: string;
  collectionId: string;
  name: string;
};

/**
 * @dev Whitelist config.
 */
export class PlatformConfigDto {
  maxAllowedOptions: number;
  maxAllowedItems: number;
  allowCurrencies: TokenEntity[];
  allowNTFCollections: allowNTFCollection[];
}

export type PlatformConfigDtoV2 = Record<
  ChainId,
  {
    maxAllowedOptions: number;
    maxAllowedItems: number;
    currencies: TokenEntity[];
    collections: allowNTFCollection[];
  }
>;
