import web3 from "@solana/web3.js";
import { createContext } from "react";
import { ConnectedWallet } from "@saberhq/use-solana";
import { SwapProgramService } from "@/src/services/swap-program.service";
import { SwapProgramServiceV0 } from "@/src/services/swap-program-v0.service";
import { AugmentedProvider } from "@saberhq/solana-contrib";

/** @dev Define state for context. */
export interface WalletContextState {
  /**
   * @dev The function to sign message in Solana network.
   * */
  signMessage(message: string): Promise<Uint8Array>;

  /**
   * @dev The function to disconnect walle & logout to Hamster server and Firebase.
   */
  disconnect(): Promise<void>;

  /**
   * @dev The function to get sol balance of a specific wallet or signer.
   * @param {PublicKey} pub
   */
  getSolBalance(pub?: web3.PublicKey): Promise<number>;

  /**
   * @dev Expose context frrom solana-adapter.
   */
  solanaWallet: ConnectedWallet;
  provider: AugmentedProvider;

  /**
   * @dev Define Program service.
   */
  programService: SwapProgramService | SwapProgramServiceV0;

  /**
   * @dev Sol balance of signer.
   */
  solBalance: number;
}

/** @dev Initiize context. */
export const WalletContext = createContext<WalletContextState>(null);
