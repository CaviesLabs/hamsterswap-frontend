import { networkProvider } from "@/src/providers/network.provider";
import { NftEntity, GetListNftDto, GetNftDto } from "@/src/dto/nft.dto";
import { INftService } from "./nft.service";

export class SolNftService implements INftService {
  /**
   * @dev Service to fetch nft list from rpc.
   * @param {GetListNftDto} getListNftDto.
   * @returns {Promise<NftEntity[]>}
   */
  async getNftList(getListNftDto: GetListNftDto): Promise<NftEntity[]> {
    return await networkProvider.request<NftEntity[]>(
      `/metadata/nft/v1/portfolio`,
      { method: "GET", params: { walletAddress: getListNftDto.walletAddress } }
    );
  }

  /**
   * @dev Service to fetch nft detail from rpc.
   * @param {GetNftDto} getNftDto.
   * @returns {Promise<NftDetailDto>}
   */
  async getNftDetail(getNftDto: GetNftDto): Promise<NftEntity> {
    const resp = await networkProvider.request(
      `/metadata/nft/detail/${getNftDto.contractAddress}`,
      { method: "GET" }
    );
    return (resp as any).data?.[0];
  }
}
