type allowCurrency = {
  id: string;
  image: string;
  name: string;
  type: string;
  decimals: number;
};
export type allowNTFCollection = {
  id: string;
  image: string;
  name: string;
  type: string;
};

export class PlatformConfigDto {
  maxAllowedOptions: number;
  maxAllowedItems: number;
  allowCurrencies: allowCurrency[];
  allowNTFCollections: allowNTFCollection[];
}
