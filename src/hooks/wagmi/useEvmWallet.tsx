import { createContext, useMemo, useCallback } from "react";
import {
  useWalletClient,
  useBalance,
  useAccount,
  useSignMessage,
  type WalletClient,
} from "wagmi";
import { getEvmContractService } from "@/src/services/evm-contract.service";
import { BrowserProvider, JsonRpcSigner, MaxUint256 } from "ethers";
import { useMain } from "@/src/hooks/pages/main";

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
  const { platformConfig } = useMain();
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
  const { platformConfig } = useMain();
  const ethWallet = useAccount();

  /**
   * @dev The function to submit proposal.
   * @returns {Promise<void>} The promise object.
   * @notice This function will be used in submit proposal.
   */
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
      if (
        !platformConfig?.programAddress ||
        !platformConfig?.multicall3Address ||
        !signer
      )
        throw new Error("Missing required modules.");
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

  /**
   * @dev The function to full fill proposal.
   * @returns {Promise<void>} The promise object.
   */
  const fullFillProposal = useCallback(
    async (args: {
      proposalId: string;
      optionId: string;
      wrappedTokenAmount: bigint;
      wrappedRecipientTokenAmount?: bigint;
    }) => {
      if (
        !platformConfig?.programAddress ||
        !platformConfig?.multicall3Address ||
        !signer
      )
        throw new Error("Missing required modules.");
      return await getEvmContractService(
        signer,
        platformConfig
      )?.fullFillProposal(
        ethWallet?.address?.toString(),
        args.proposalId,
        args.optionId,
        args.wrappedTokenAmount,
        args.wrappedRecipientTokenAmount
      );
    },
    [ethWallet, signer, platformConfig]
  );

  /**
   * @dev The function to cancel proposal.
   * @returns {Promise<void>} The promise object.
   * @notice This function will be used in submit proposal.
   */
  const cancelProposal = useCallback(
    async (args: { proposalId: string }) => {
      if (
        !platformConfig?.programAddress ||
        !platformConfig?.multicall3Address ||
        !signer
      )
        throw new Error("Missing required modules.");
      return await getEvmContractService(
        signer,
        platformConfig
      )?.cancelProposal(args.proposalId);
    },
    [ethWallet, signer, platformConfig]
  );

  return useMemo(
    () => ({
      submitProposal,
      fullFillProposal,
      cancelProposal,
    }),
    [
      ethWallet,
      signer,
      platformConfig,
      submitProposal,
      fullFillProposal,
      cancelProposal,
    ]
  );
};

export const useEvmToken = () => {
  const { signer } = useEvmWallet();
  const { platformConfig } = useMain();
  const evmContractService = useEvmContractService();
  const ethWallet = useAccount();
  const contract = useMemo(
    () => evmContractService?.hamsterContract,
    [signer, evmContractService]
  );

  /**
   * @dev The function to check if the token is approved.
   * @returns {boolean} The boolean value.
   */
  const checkIsApproved = useCallback(
    async (
      tokenAddress: string,
      amount: bigint,
      tokenType: number
    ): Promise<boolean> => {
      if (
        !platformConfig?.programAddress ||
        !platformConfig?.multicall3Address ||
        !signer
      )
        throw new Error("Missing required modules.");
      switch (tokenType) {
        case 1:
          return (
            (await getEvmContractService(signer, platformConfig)
              .getTokenContract(tokenAddress)
              .allowance(ethWallet?.address, await contract.getAddress())) >=
            amount
          );
        case 0:
        default:
          return await getEvmContractService(signer, platformConfig)
            .getNftContract(tokenAddress)
            .isApprovedForAll(ethWallet?.address, await contract.getAddress());
      }
    },
    [platformConfig, contract, ethWallet, signer]
  );

  /**
   * @dev The function to approve token.
   * @returns {Promise<void>} The promise object.
   * @notice This function will be used in submit proposal.
   */
  const approveToken = useCallback(
    async (tokenAddress: string, tokenId: number) => {
      if (
        !platformConfig?.programAddress ||
        !platformConfig?.multicall3Address ||
        !signer
      )
        throw new Error("Missing required modules.");
      // eslint-disable-next-line prettier/prettier
      if (!tokenId) return await getEvmContractService(signer, platformConfig).getTokenContract(tokenAddress).approve(await contract.getAddress(), MaxUint256);
      return await getEvmContractService(signer, platformConfig)
        .getNftContract(tokenAddress)
        .setApprovalForAll(await contract.getAddress(), true);
    },
    [platformConfig, contract, ethWallet, signer]
  );

  return useMemo(
    () => ({
      checkIsApproved,
      approveToken,
    }),
    [platformConfig, contract, ethWallet, signer]
  );
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
