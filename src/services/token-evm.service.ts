import { IERC20__factory } from "@/src/providers/evm-program";
import { ReadonlyEthersProvider } from "@/src/providers/readonly-ethers.provider";
import { AppNumber } from "@/src/providers/math/app-number.provider";
import { ITokenService } from "./token.service";
import { ChainId } from "../entities/chain.entity";

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

export class EvmTokenService implements ITokenService {
  private readonly readonlyProvider: ReadonlyEthersProvider;
  constructor(chainId: ChainId) {
    this.readonlyProvider = ReadonlyEthersProvider.create(chainId);
  }

  /**
   * @notice Convert token info to token entity
   * @param tokenInfo
   */
  public convertToTokenEntity(tokenInfo: TokenInfo) {
    return {
      logo: "data:image/png;base64,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",
      chainKey: this.readonlyProvider.chainEntity.chainId,
      name: tokenInfo.name,
      symbol: tokenInfo.symbol,
      decimals: Number(tokenInfo.decimals),
      contractAddress: tokenInfo.address,
      isGasToken: false,
      recommended: false,
      coingeckoId: "",
      unOfficial: true,
    };
  }

  /**
   * @notice getRealTokenAmount will preserve correct decimals value for a given amount.
   * @param tokenAddress
   * @param amount
   */
  public async getRealTokenAmount(
    tokenAddress: string,
    amount: bigint,
    decimals: number
  ): Promise<number> {
    return new AppNumber(Number(amount))
      .divide(new AppNumber(10).pow(new AppNumber(Number(decimals))))
      .toNumber();
  }

  /**
   * @notice Get token balance of a given address and a given contract address.
   * @param address
   * @param contractAddress
   */
  public async getTokenBalanceOf(
    address: string,
    contractAddress: string,
    decimals: number
  ): Promise<number> {
    const tokenContract = IERC20__factory.connect(
      contractAddress,
      this.readonlyProvider.provider
    );
    const balance = await tokenContract.balanceOf(address);
    return this.getRealTokenAmount(contractAddress, balance, decimals);
  }
}
