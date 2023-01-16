import {
  ExpectedItemEntity,
  OfferedItemEntity,
  SwapItemEntity,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { SUPPORTED_TOKEN } from "@/src/components/create-proposal/token-select-item";

export const parseProposal = (item: SwapItemEntity) => {
  const resp: any = {
    ...item,
    assetType: item.type,
  };

  if (resp.type === SwapItemType.CURRENCY) {
    const meta = item.nftMetadata;
    resp.name = `${
      item.amount /
      Math.pow(
        10,
        SUPPORTED_TOKEN.find((Sitem) => Sitem.address === item.contractAddress)
          ?.decimal
      )
    } ${meta.symbol}`;
    resp.collection = "Currency";
    resp.image = meta?.icon;
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
  item: OfferedItemEntity | ExpectedItemEntity
) => {
  const resp: any = {
    ...item,
  };

  if (resp.assetType === SwapItemType.CASH) {
    resp.name = `${item.amount} USD`;
    resp.collection = "Stripe";
    resp.image = "/assets/images/asset-cash.png";
  } else if (resp.assetType === SwapItemType.CURRENCY) {
    const tokenInfo = SUPPORTED_TOKEN.find(
      (item) => item.address === resp.nft_address
    );
    resp.name = `${item.tokenAmount} ${tokenInfo.symbol}`;
    resp.collection = "Currency";
    resp.image = tokenInfo.iconUrl;
  } else if (resp.assetType === SwapItemType.NFT) {
    resp.name = item?.nft_name;
    resp.collection = item?.nft_collection_name;
    resp.image = item?.nft_image_uri;
    resp.nftAddress = item.nft_address;
  }

  return resp;
};
