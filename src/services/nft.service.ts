import { GetListNftDto, GetNftDto, NftEntity } from "@/src/dto/nft.dto";
import { ChainId } from "@/src/entities/chain.entity";
import { SolNftService } from "./nft-sol.service";
import { EvmNftService } from "./nft-evm.service";

/**
 * @dev Interface of nft service.
 * @property {function} getNftList Get nft list.
 * @property {function} getNftDetail Get nft detail.
 */
export interface INftService {
  /**
   * @dev Get nft list which is owned by wallet address.
   * @param {GetListNftDto} payload.
   * @returns {Promise<NftEntity[]>} list of nft.
   */
  getNftList(payload: GetListNftDto): Promise<NftEntity[]>;

  /**
   * @dev Get nft detail based on contract address and token id.
   * @param {GetNftDto} payload.
   * @returns {Promise<NftDetailDto>} nft detail.
   */
  getNftDetail(payload: GetNftDto): Promise<NftEntity>;
}

export class NftService {
  /**
   * @dev Get service by chainId.
   * @param chainId.
   * @returns {INftService} service.
   */
  static getService(chainId: ChainId): INftService {
    if (chainId === ChainId.solana) return new SolNftService();
    return new EvmNftService();
  }
}
