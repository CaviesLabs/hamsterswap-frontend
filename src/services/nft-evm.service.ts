import { networkProvider } from "@/src/providers/network.provider";
import { NftEntity, GetListNftDto, GetNftDto } from "@/src/dto/nft.dto";
import { NftEvmProvider } from "@/src/providers/nft-evm.provider";
import { INftService } from "./nft.service";

export class EvmNftService implements INftService {
  /**
   * @dev Service to fetch nft list from rpc.
   * @param {GetListNftDto} getListNftDto.
   * @returns {Promise<NftEntity[]>}
   */
  async getNftList(getListNftDto: GetListNftDto): Promise<NftEntity[]> {
    const data = await networkProvider.request<NftEntity[]>(
      `/evm/metadata/nft/portfolio/${getListNftDto.chainId}/${getListNftDto.walletAddress}`,
      { method: "GET" }
    );

    /**
     * @dev Correct data to NftEntity.
     * @notice Filter out nft which is not whitelisted.
     */
    return data
      .map((item) => new NftEvmProvider().parseEntity(item))
      .filter((item) => item.isWhiteListed);
  }

  /**
   * @dev Service to fetch nft detail from rpc.
   * @param {GetNftDto} getNftDto.
   * @returns {Promise<NftDetailDto>}
   */
  async getNftDetail(getNftDto: GetNftDto): Promise<NftEntity> {
    const resp = await networkProvider.request(
      `/evm/metadata/nft/detail/${getNftDto.chainId}/${getNftDto.contractAddress}/${getNftDto.tokenId}`,
      { method: "GET" }
    );

    return new NftEvmProvider().parseEntity((resp as any).data);
  }
}
