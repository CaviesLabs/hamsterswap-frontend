/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  ReactNode,
  FC,
  // useState,
  // useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  useWalletClient,
  useBalance,
  useAccount,
  useSignMessage,
  type WalletClient,
} from "wagmi";
import {
  ERC20,
  ERC20__factory,
  ERC721,
  ERC721__factory,
  HamsterSwap,
  HamsterSwap__factory,
  Multicall3,
  Multicall3__factory,
} from "@/src/providers/evm-program";
import { getEvmContractService } from "@/src/services/evm-contract.service";

import { BrowserProvider, JsonRpcSigner, MaxUint256 } from "ethers";
import { useSelector } from "@/src/redux";
import { platform } from "os";

/** @dev Initialize context. */
export const EvmWalletContext = createContext<{
  nativeBalance: string;
  walletAddress: string;
  signer: unknown;
}>(null);

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport as any, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  return useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}

/**
 * @dev Provider to wrap all children components for support evm wallet.
 * @notice This provider will be used in app.tsx.
 * @param {ReactNode} props.children The children components.
 * @returns {JSX.Element} The jsx element.
 */
export const EvmWalletProvider: FC<{ children: ReactNode }> = (props) => {
  const ethWallet = useAccount();
  const walletClient = useEthersSigner();
  const { data: nativeBalanceData } = useBalance({
    address: ethWallet?.address,
  });

  return (
    <EvmWalletContext.Provider
      value={{
        signer: walletClient,
        walletAddress: ethWallet?.address?.toString() || "",
        nativeBalance: parseFloat(nativeBalanceData?.formatted)?.toFixed(3),
      }}
    >
      {props.children}
    </EvmWalletContext.Provider>
  );
};

/**
 * @dev Custom hook to sign message with evm wallet.
 * @param {string} message The message to sign.
 * @returns {object} The object contains sign message function.
 */
export const useSignEvmMessage = (message: string) => {
  return useSignMessage({
    message,
  });
};

export const useEvmContractService = () => {
  const { signer } = useEvmWallet();
  const { platformConfig } = useSelector();
  return useMemo(
    () =>
      platformConfig?.programAddress && platformConfig?.multicall3Address
        ? getEvmContractService(signer, platformConfig)
        : null,
    [signer, platformConfig]
  );
};

export const useEvmHamsterSwapContract = () => {
  const { signer } = useEvmWallet();
  const { platformConfig } = useSelector();
  const ethWallet = useAccount();

  const submitProposal = useCallback(
    async (
      args: {
        proposalId: string;
        offeredItems: any[];
        swapOptions: any[];
        expiredAt: bigint;
      },
      wrapTokenAmount: bigint
    ) => {
      console.log(platformConfig);
      if (!platformConfig?.programAddress || !platformConfig?.multicall3Address)
        return;
      return await getEvmContractService(
        signer,
        platformConfig
      )?.submitProposal(
        ethWallet?.address?.toString(),
        args.proposalId,
        args.offeredItems,
        args.swapOptions,
        args.expiredAt,
        wrapTokenAmount
      );
    },
    [ethWallet, signer, platformConfig]
  );

  return useMemo(() => {
    return {
      submitProposal,
    };
  }, [ethWallet, signer, platformConfig]);
};

export const useEvmToken = () => {
  const { signer } = useEvmWallet();
  const { platformConfig } = useSelector();
  const evmContractService = useEvmContractService();
  const ethWallet = useAccount();
  const contract = useMemo(
    () => evmContractService?.hamsterContract,
    [signer, evmContractService]
  );

  /**
   * @dev Initialize token contract instance.
   * @returns {ERC20} contract instance.
   */
  const getTokenContract = useCallback<(tokenAddress: string) => ERC20>(
    (tokenAddress) => {
      return ERC20__factory.connect(tokenAddress, signer as any);
    },
    [signer]
  );

  /**
   * @dev Initialize nft contract instance.
   * @returns {ERC721} contract instance.
   */
  const getNftContract = useCallback<(tokenAddress: string) => ERC721>(
    (tokenAddress) => {
      console.log({ tokenAddress, signer });
      return ERC721__factory.connect(tokenAddress, signer as any);
    },
    [signer]
  );

  /**
   * @dev The function to check if the token is approved.
   * @returns {boolean} The boolean value.
   */
  const checkIsApproved = useCallback(
    async (
      tokenAddress: string,
      amount: bigint,
      tokenId: number
    ): Promise<boolean> => {
      switch (tokenId) {
        case 0:
          return (
            (await getTokenContract(tokenAddress).allowance(
              ethWallet?.address,
              await contract.getAddress()
            )) >= amount
          );
        case 2:
        default:
          return await getNftContract(tokenAddress).isApprovedForAll(
            ethWallet?.address,
            await contract.getAddress()
          );
      }
    },
    [getTokenContract, getNftContract, contract, ethWallet]
  );

  /**
   * @dev The function to approve token.
   * @returns {Promise<void>} The promise object.
   * @notice This function will be used in submit proposal.
   */
  const approveToken = useCallback(
    async (tokenAddress: string, amount: bigint, tokenId: number) => {
      // eslint-disable-next-line prettier/prettier
      if (!tokenId) return await getTokenContract(tokenAddress).approve(await contract.getAddress(), MaxUint256);
      return await getNftContract(tokenAddress).setApprovalForAll(
        await contract.getAddress(),
        true
      );
    },
    [getTokenContract, getNftContract, contract, ethWallet]
  );

  return {
    checkIsApproved,
    approveToken,
  };
};

/** @dev Use context hook. */
export const useEvmWallet = () => {
  const ethWallet = useAccount();
  const walletClient = useEthersSigner();
  const { data: nativeBalanceData } = useBalance({
    address: ethWallet?.address,
  });

  return useMemo(
    () => ({
      signer: walletClient,
      walletAddress: ethWallet?.address?.toString() || "",
      nativeBalance: parseFloat(nativeBalanceData?.formatted)?.toFixed(3),
    }),
    [ethWallet, walletClient, nativeBalanceData]
  );
};
