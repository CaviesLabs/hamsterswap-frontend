import { useCallback, useMemo } from "react";
import { useSelector } from "@/src/redux";
import { ChainId } from "@/src/entities/chain.entity";
import { useWallet as useSolWallet } from "@/src/hooks/useWallet";
import * as bs from "bs58";
import { SIGN_MESSAGE } from "@/src/utils";
import { disconnect as disconnectWagmi } from "@wagmi/core";
import { useEvmWallet, useSignEvmMessage } from "./wagmi";

/**
 * @dev Get wallet address from useEvmWallet or useSolana
 * @notice This hook is used to get wallet address from useEvmWallet or useSolana
 */
export const useAppWallet = () => {
  const { chainId } = useSelector();
  const { walletAddress: evmAddress } = useEvmWallet();
  const { solanaWallet } = useSolWallet();

  return useMemo(() => {
    return {
      walletAddress:
        chainId === ChainId.solana
          ? solanaWallet?.publicKey?.toString()
          : evmAddress,
    };
  }, [chainId, evmAddress, solanaWallet]);
};

/**
 * @dev Get sign message from useEvmWallet or useSolana
 * @notice This hook is used to get sign message from useEvmWallet or useSolana
 * @returns {signMessage: Function}
 */
export const useIdpSignMessage = () => {
  const { chainId } = useSelector();
  const { signMessageAsync } = useSignEvmMessage(SIGN_MESSAGE);
  const { signMessage } = useSolWallet();

  return {
    signIdpMessage: useCallback(async () => {
      // eslint-disable-next-line prettier/prettier
      if (chainId === ChainId.solana) return bs.encode(await signMessage(SIGN_MESSAGE));
      return await signMessageAsync();
    }, [chainId, signMessageAsync, signMessage]),
  };
};

export const useDisconnectWallet = () => {
  const { chainId } = useSelector();
  const { disconnect: disconnectGoki } = useSolWallet();

  return {
    disconnect: useCallback(async () => {
      if (chainId === ChainId.solana) return disconnectGoki();
      return disconnectWagmi();
    }, [chainId]),
  };
};
