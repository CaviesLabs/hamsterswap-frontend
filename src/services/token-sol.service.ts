import { networkProvider } from "@/src/providers/network.provider";
import { GetBalanceSplResponseEntity } from "@/src/entities/spl.entity";
import { ITokenService } from "./token.service";

export class SolTokenService implements ITokenService {
  async getTokenBalanceOf(
    walletAddress: string,
    mintAccount: string
  ): Promise<number> {
    try {
      /**
       * @dev Request into solana mainet to get token info.
       */
      const response =
        await networkProvider.request<GetBalanceSplResponseEntity>(
          "https://silent-twilight-wildflower.solana-mainnet.quiknode.pro/82f3034e016e3b800a8e2fc6d00efe9e270c046b/",
          {
            method: "POST",
            data: {
              jsonrpc: "2.0",
              id: 1,
              method: "getTokenAccountsByOwner",
              params: [
                walletAddress,
                {
                  mint: mintAccount,
                },
                {
                  encoding: "jsonParsed",
                },
              ],
            },
          }
        );

      return response?.result?.value?.[0]?.account?.data?.parsed?.info
        ?.tokenAmount?.uiAmount;
    } catch {
      return 0;
    }
  }
}
