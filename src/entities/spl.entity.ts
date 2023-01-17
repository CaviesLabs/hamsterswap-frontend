/**
 * @dev The entity for response when get SPL token info of wallet.
 */
export class GetBalanceSplResponseEntity {
  jsonrpc: string;
  result: {
    context: {
      apiVersion: string;
      slot: number;
    };
    value: {
      account: {
        data: {
          parsed: {
            info: {
              isNative: boolean;
              mint: string;
              owner: string;
              state: string;
              tokenAmount: {
                amount: string;
                decimals: number;
                uiAmount: number;
                uiAmountString: string;
              };
            };
            type: string;
          };
          program: string;
          space: number;
        };
        executable: boolean;
        lamports: number;
        owner: string;
        rentEpoch: number;
      };
      pubkey: string;
    }[];
  };
  id: number;
}
