import { networkProvider } from "@/src/providers/network.provider";
import { GetBalanceSplResponseEntity } from "@/src/entities/spl.entity";

export class SplServicce {
  async getBalance(
    walletAddress: string,
    mintAccount: string
  ): Promise<number> {
    try {
      /**
       * @dev Request into solana mainet to get token info.
       */
      const response =
        await networkProvider.request<GetBalanceSplResponseEntity>(
          "https://boldest-few-field.solana-mainnet.quiknode.pro/0ffa9f9f5e9141aa33a030081b78fdfe40bfbae6/",
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

export const splService = new SplServicce();
