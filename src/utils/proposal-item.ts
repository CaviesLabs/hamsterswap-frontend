import {
  ExpectedItemEntity,
  OfferedItemEntity,
  SwapItemEntity,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { AllowCurrency } from "@/src/entities/platform-config.entity";
import UtilsProvider from "@/src/utils/utils.provider";

export const parseProposal = (
  item: SwapItemEntity,
  allowCurrencies: AllowCurrency[]
) => {
  const resp: any = {
    ...item,
    assetType: item.type,
  };

  if (resp.type === SwapItemType.CURRENCY) {
    const tokenInfo = allowCurrencies.find(
      (Sitem) => Sitem.id === item.contractAddress
    );
    resp.name = `${UtilsProvider.formatLongNumber(
      item.amount / Math.pow(10, tokenInfo?.decimals)
    )} ${tokenInfo?.name}`;
    resp.collection = "Currency";
    resp.image = tokenInfo?.image;
  } else if (resp.type === SwapItemType.NFT) {
    const meta = item.nftMetadata;
    resp.name = meta?.nft_name;
    resp.collection = meta?.nft_collection_name;
    resp.image = meta?.nft_image;
    resp.nftAddress = item.contractAddress;
  }

  return resp;
};

export const parseOfferCreateProposal = (
  item: OfferedItemEntity | ExpectedItemEntity,
  allowCurrencies: AllowCurrency[]
) => {
  const resp: any = {
    ...item,
  };

  if (resp.assetType === SwapItemType.CASH) {
    resp.name = `${item.amount} USD`;
    resp.collection = "Stripe";
    resp.image = "/assets/images/asset-cash.png";
  } else if (resp.assetType === SwapItemType.CURRENCY) {
    const tokenInfo = allowCurrencies.find(
      (item) => item.id === resp.nft_address
    );
    resp.name = `${UtilsProvider.formatLongNumber(item.tokenAmount)} ${
      tokenInfo.name
    }`;
    resp.collection = "Currency";
    resp.image = tokenInfo.image;
  } else if (resp.assetType === SwapItemType.NFT) {
    resp.name = item?.nft_name;
    resp.collection = item?.nft_collection_name;
    resp.image = item?.nft_image_uri;
    resp.nftAddress = item.nft_address;
  }

  return resp;
};
