import { NftEntity, NftStatus } from "@/src/dto/nft.dto";
import { Keypair } from "@solana/web3.js";

export class NftEvmProvider {
  /**
   * @dev The function to parse nft entity.
   * @param {NftEntity} data.
   * @returns {NftEntity}
   */
  public parseEntity(data: NftEntity): NftEntity {
    return {
      ...data,
      decimal: 0,
      address: Keypair.generate().publicKey.toString(),
      realAddress: data?.address,
      status: NftStatus.holding,
    };
  }
}
