import { useMemo } from "react";
import { useMain } from "./pages/main";
import { useEvmWallet } from "./wagmi";
import { useSolana } from "@saberhq/use-solana";
import { ChainId } from "../entities/chain.entity";

/**
 * @dev Get wallet address from useEvmWallet or useSolana
 * @notice This hook is used to get wallet address from useEvmWallet or useSolana
 */
export const useAppWallet = () => {
  const { chainId } = useMain();
  const { walletAddress: bscAddress } = useEvmWallet();
  const { wallet: solanaWallet } = useSolana();

  return {
    walletAddress: useMemo(() => {
      return chainId === ChainId.solana
        ? solanaWallet?.publicKey?.toString()
        : bscAddress;
    }, [chainId, bscAddress, solanaWallet]),
  };
};
