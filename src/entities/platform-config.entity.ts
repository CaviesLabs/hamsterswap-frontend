/**
 * @dev The interface of currency which hamster allow to use.
 */
export type AllowCurrency = {
  id: string;
  image: string;
  name: string;
  type: string;
  decimals: number;
};

/**
 * @dev The interface of nft collection which hamster allow to use.
 */
export type allowNTFCollection = {
  idList: string[];
  image: string;
  name: string;
  type: string;
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
