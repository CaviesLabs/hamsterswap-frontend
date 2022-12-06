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
  }

  return resp;
};
