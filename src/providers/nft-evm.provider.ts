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
      decimals: 0,
      status: NftStatus.holding,
      address: Keypair.generate().publicKey.toString(),
      realAddress: data?.address,
    };
  }
}
