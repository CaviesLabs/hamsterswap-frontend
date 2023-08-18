import { ChainId } from "./chain.entity";

/**
 * @dev The interface of currency which hamster allow to use.
 */
export type AllowCurrency = {
  explorerUrl: string;
  currencyId: string;
  address: string;
  icon: string;
  name: string;
  symbol: string;
  decimals: 9;
  isNativeToken?: boolean;
  realAddress?: string;
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
  allowCurrencies: AllowCurrency[];
  allowNTFCollections: allowNTFCollection[];
}

export type PlatformConfigDtoV2 = Record<
  ChainId,
  {
    maxAllowedOptions: number;
    maxAllowedItems: number;
    currencies: AllowCurrency[];
    collections: allowNTFCollection[];
  }
>;
