import { networkProvider } from "@/src/providers/network.provider";
import {
  GetListNftDto,
  GetNftDto,
  NftDetailDto,
  NftEntity,
} from "@/src/dto/nft.dto";

export class NftService {
  async listNft(payload: GetListNftDto): Promise<NftEntity[]> {
    const resp = await networkProvider.request("/metadata/nft/v1/portfolio", {
      params: {
        walletAddress: payload.walletAddress,
      },
    });
    return resp as NftEntity[];
  }
  async getNftDetail(payload: GetNftDto): Promise<NftDetailDto> {
    const resp = await networkProvider.request(
      `/metadata/nft/detail/${payload.mintAddress}`,
      {}
    );
    return (resp as any).data?.[0];
  }
}

export const nftService = new NftService();
