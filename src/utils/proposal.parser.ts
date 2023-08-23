import {
  ExpectedItemEntity,
  OfferedItemEntity,
  SwapItemEntity,
  SwapItemInfo,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { TokenEntity } from "@/src/entities/platform-config.entity";
import UtilsProvider from "@/src/utils/utils.provider";

export const parseProposal = (
  item: SwapItemEntity,
  allowCurrencies: TokenEntity[]
): SwapItemInfo => {
  const resp: SwapItemInfo = {} as SwapItemInfo;
  if (item.type === SwapItemType.CURRENCY) {
    const tokenInfo = allowCurrencies?.find(
      (Sitem) => Sitem.realAddress === item.contractAddress
    );
    resp.name = `${UtilsProvider.formatLongNumber(
      item.amount / Math.pow(10, tokenInfo?.realDecimals)
    )} ${tokenInfo?.name}`;
    resp.collectionName = "Currency";
    resp.image = tokenInfo?.icon;
    resp.address = item.contractAddress;
  } else if (item.type === SwapItemType.NFT) {
    const meta = item.nftMetadata?.metadata;
    resp.name = meta?.name;
    resp.collectionName = meta?.collectionName;
    resp.image = meta?.icon || meta?.image;
    resp.address = item.contractAddress;
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
    const tokenInfo = allowCurrencies?.find(
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
