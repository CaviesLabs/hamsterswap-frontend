import { useCallback, useMemo } from "react";
import { useSelector } from "@/src/redux";
import { ChainId } from "@/src/entities/chain.entity";
import { useWallet as useSolWallet } from "@/src/hooks/useWallet";
import * as bs from "bs58";
import { SIGN_MESSAGE } from "@/src/utils";
import { disconnect as disconnectWagmi } from "@wagmi/core";
import { getAuthService } from "@/src/actions/auth.action";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEvmWallet, useSignEvmMessage } from "./wagmi";
import { useDispatch } from "react-redux";
import { setProfile } from "@/src/redux/actions/hamster-profile/profile.action";

/**
 * @dev Get wallet address from useEvmWallet or useSolana
 * @notice This hook is used to get wallet address from useEvmWallet or useSolana
 * @returns {walletAddress: string}
 * @see src/hooks/useAppWallet.ts
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
 * @see src/hooks/useAppWallet.ts
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

/**
 * @dev Get disconnect wallet from useEvmWallet or useSolana
 * @notice This hook is used to get disconnect wallet from useEvmWallet or useSolana
 * @returns {disconnect: Function}
 * @see src/hooks/useAppWallet.ts
 */
export const useDisconnectWallet = () => {
  const { chainId } = useSelector();
  const { disconnect: disconnectGoki } = useSolWallet();
  const dispatch = useDispatch();

  return {
    disconnect: useCallback(async () => {
      await getAuthService().logout();
      dispatch(setProfile(null));
      if (chainId === ChainId.solana) {
        await disconnectGoki();
      } else {
        await disconnectWagmi();
      }
    }, [chainId, dispatch]),
  };
};

/**
 * @dev Get native balance from useEvmWallet or useSolana
 * @notice This hook is used to get native balance from useEvmWallet or useSolana
 * @returns {nativeBalance: number}
 * @see src/hooks/useAppWallet.ts
 */
export const useNativeBalance = (): number => {
  const { chainId } = useSelector();
  const { solBalance } = useSolWallet();
  const { nativeBalance: evmBalance } = useEvmWallet();

  return useMemo(
    () =>
      chainId === ChainId.solana
        ? solBalance / LAMPORTS_PER_SOL
        : parseFloat(evmBalance),
    [chainId, solBalance, evmBalance]
  );
};
