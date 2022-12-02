import { networkProvider } from "@/src/providers/network.provider";
import { ListNftDto } from "@/src/dto/nft.dto";

export class NftService {
  listNft(payload: ListNftDto): Promise<ListNftDto[]> {
    return networkProvider.request<ListNftDto[]>("/metadata/nft/list", {
      params: {
        address: payload.address,
      },
    });
  }
}

export const nftService = new NftService();
