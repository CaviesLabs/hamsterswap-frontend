import { SwapProgramProvider } from "./swap-program.provider";
import { Wallet } from "@project-serum/anchor/dist/esm/provider";

/** @dev Declare global @var {SwapProgramProvider}. */
let swapProgramProvider: SwapProgramProvider;

/**
 * @dev Initialize @var {SwapProgramProvider}.
 * @param {Wallet} walletProvider.
 * @returns {SwapProgramProvider}.
 * */
export const getSwapProgramProvider = (
  walletProvider: Wallet,
  options?: {
    newInit: boolean;
  }
): SwapProgramProvider => {
  /**
   * @dev
   * Initilize program provider with wallet context
   * if its has not been initialized
   * or force to init new program with new wallet provider when user change wallet.
   * */
  if (!swapProgramProvider || options?.newInit) {
    swapProgramProvider = new SwapProgramProvider(walletProvider);
  }

  /** @dev Return program. */
  return swapProgramProvider;
};
