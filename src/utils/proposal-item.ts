import { SwapItemEntity, SwapItemType } from "@/src/entities/proposal.entity";

export const parseProposal = (item: SwapItemEntity) => {
  const resp: any = {
    ...item,
    assetType: item.type,
  };

  if (resp.type === SwapItemType.CURRENCY) {
    resp.name = `${item.amount} USD`;
    resp.collection = "Stripe";
    resp.image = "/assets/images/asset-cash.png";
  } else if (resp.type === SwapItemType.NFT) {
    const meta = item.nftMetadata[0];
    resp.name = meta?.nft_name;
    resp.collection = meta?.nft_collection_name;
    resp.image = meta?.nft_image;
    resp.nftAddress = item.contractAddress;
  }

  return resp;
};