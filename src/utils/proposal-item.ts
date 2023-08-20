import {
  ExpectedItemEntity,
  OfferedItemEntity,
  SwapItemEntity,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { TokenEntity } from "@/src/entities/platform-config.entity";
import UtilsProvider from "@/src/utils/utils.provider";

export const parseProposal = (
  item: SwapItemEntity,
  allowCurrencies: TokenEntity[]
) => {
  const resp: any = {
    ...item,
    assetType: item.type,
  };

  if (resp.type === SwapItemType.CURRENCY) {
    const tokenInfo = allowCurrencies.find(
      (Sitem) => Sitem.address === item.contractAddress
    );
    resp.name = `${UtilsProvider.formatLongNumber(
      item.amount / Math.pow(10, tokenInfo?.decimals)
    )} ${tokenInfo?.name}`;
    resp.collection = "Currency";
    resp.image = tokenInfo?.icon;
  } else if (resp.type === SwapItemType.NFT) {
    const meta = item.nftMetadata;
    resp.name = meta?.name;
    resp.collection = meta?.collectionName;
    resp.image = meta?.image;
    resp.nftAddress = item.contractAddress;
  }

  return resp;
};

export const parseOfferCreateProposal = (
  item: OfferedItemEntity | ExpectedItemEntity,
  allowCurrencies: TokenEntity[]
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
      (item) => item.address === resp.nft_address
    );
    resp.name = `${UtilsProvider.formatLongNumber(item.tokenAmount)} ${
      tokenInfo.name
    }`;
    resp.collection = "Currency";
    resp.image = tokenInfo.icon;
  } else if (resp.assetType === SwapItemType.NFT) {
    resp.name = item?.name;
    resp.collection = item?.collectionName;
    resp.image = item?.image;
    resp.nftAddress = item.address;
  }

  return resp;
};
