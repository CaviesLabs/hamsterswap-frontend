export * from "./swap-program.provider";
import { SwapProgramProvider } from "./swap-program.provider";

/** @dev Declare global @var {SwapProgramProvider}. */
let swapProgramProvider: SwapProgramProvider;

/**
 * @dev Initialize @var {SwapProgramProvider}.
 * @param {Wallet} walletProvider.
 * @param options
 * @returns {SwapProgramProvider}.
 * */
export const getSwapProgramProvider = (
  walletProvider?: any,
  options?: {
    reInit: boolean;
  }
): SwapProgramProvider => {
  /**
   * @dev
   * Initilize program provider with wallet context
   * if its has not been initialized
   * or force to init new program with new wallet provider when user change wallet.
   * */
  if (!swapProgramProvider || options?.reInit) {
    /**
     * @dev Return if context is null.
     */
    if (!walletProvider) return swapProgramProvider;

    /**
     * @dev Initilize new provider with context.
     */
    swapProgramProvider = new SwapProgramProvider(walletProvider);
  }

  /** @dev Return program. */
  return swapProgramProvider;
};
