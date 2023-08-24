import { useCallback, useMemo } from "react";
import { ChainId } from "@/src/entities/chain.entity";
import { useWallet as useSolWallet } from "@/src/hooks/useWallet";
import * as bs from "bs58";
import { SIGN_MESSAGE } from "@/src/utils";
import { disconnect as disconnectWagmi } from "@wagmi/core";
import { getAuthService } from "@/src/actions/auth.action";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEvmWallet, useSignEvmMessage } from "./wagmi";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useMain } from "./pages/main";
import State from "@/src/redux/entities/state";

/**
 * @dev Get wallet address from useEvmWallet or useSolana
 * @notice This hook is used to get wallet address from useEvmWallet or useSolana
 * @returns {walletAddress: string}
 * @see src/hooks/useAppWallet.ts
 */
export const useAppWallet = () => {
  const { chainId } = useSelector((state: State) => state);
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
 * @dev Get native token from useEvmWallet or useSolana
 * @notice This hook is used to get native token from useEvmWallet or useSolana
 * @returns {nativeToken: TokenEntity}
 */
export const useNativeToken = () => {
  const { platformConfig } = useMain();
  return useMemo(() => {
    return {
      nativeToken: platformConfig?.allowCurrencies?.find(
        (item) => item.isNativeToken
      ),
    };
  }, [platformConfig]);
};

/**
 * @dev Get sign message from useEvmWallet or useSolana
 * @notice This hook is used to get sign message from useEvmWallet or useSolana
 * @returns {signMessage: Function}
 * @see src/hooks/useAppWallet.ts
 */
export const useIdpSignMessage = () => {
  const { chainId } = useSelector((state: State) => state);
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
  const { chainId } = useSelector((state: State) => state);
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
  const { chainId } = useSelector((state: State) => state);
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

export const useConnect = () => {
  const { chainId } = useSelector((state: State) => state);
  const { connect: connectSol } = useWalletKit();
  const { openConnectModal: connectEvm } = useConnectModal();

  return useMemo(() => {
    return {
      connect: chainId === ChainId.solana ? connectSol : connectEvm,
    };
  }, [chainId, connectSol, connectEvm]);
};
