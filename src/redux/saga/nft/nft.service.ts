import { networkProvider } from "@/src/providers/network.provider";
import { GetListNftDto, NftDto } from "@/src/dto/nft.dto";

export class NftService {
  async listNft(payload: GetListNftDto): Promise<NftDto> {
    const resp = await networkProvider.request("/metadata/nft/portfolio", {
      params: {
        walletAddress: payload.walletAddress,
      },
    });
    return (resp as any).data;
  }
}

export const nftService = new NftService();
