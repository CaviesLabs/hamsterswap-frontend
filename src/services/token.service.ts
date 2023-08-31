import { ChainId } from "@/src/entities/chain.entity";
import { SolTokenService } from "./token-sol.service";
import { EvmTokenService } from "./token-evm.service";

export interface ITokenService {
  /**
   * @dev The function to get token balance of an address.
   * @param {string} address The address to get balance.
   * @param {string} contractAddress The contract address of token.
   * @param {number} decimals The decimals of token.
   * @returns {Promise<number>} The balance of token.
   */
  getTokenBalanceOf(
    address: string,
    contractAddress: string,
    decimals: number
  ): Promise<number>;
}

export class TokenService {
  /**
   * @dev The function to get token service.
   * @param {ChainId} chainId The chain id.
   * @returns {ITokenService} The token service.
   */
  static getService(chainId: ChainId): ITokenService {
    switch (chainId) {
      case ChainId.solana:
        return new SolTokenService();
      default:
        return new EvmTokenService(chainId);
    }
  }
}
