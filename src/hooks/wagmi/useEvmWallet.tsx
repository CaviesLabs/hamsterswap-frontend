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
import { useWalletClient, useBalance, useAccount, useSignMessage } from "wagmi";
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
import {
  OfferedItemEntity,
  ExpectedOpitionEntity,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { useSelector } from "@/src/redux";

/** @dev Initialize context. */
export const EvmWalletContext = createContext<{
  nativeBalance: string;
  walletAddress: string;
  signer: unknown;
}>(null);

/**
 * @dev Provider to wrap all children components for support evm wallet.
 * @notice This provider will be used in app.tsx.
 * @param {ReactNode} props.children The children components.
 * @returns {JSX.Element} The jsx element.
 */
export const EvmWalletProvider: FC<{ children: ReactNode }> = (props) => {
  const ethWallet = useAccount();
  const { data: walletClient } = useWalletClient();
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

export const useEvmHamsterSwapContract = () => {
  const { signer } = useEvmWallet();
  const { platformConfig } = useSelector();
  const ethWallet = useAccount();

  /**
   * @dev Initialize contract instance.
   * @returns {HamsterSwap} contract instance.
   */
  const contract = useMemo<HamsterSwap>(() => {
    return HamsterSwap__factory.connect(
      platformConfig.programAddress,
      signer as any
    );
  }, [signer, platformConfig]);

  /**
   * @dev Initialize Multicall3 contract instance.
   * @returns {Multicall3} contract instance.
   */
  const multicall3Contract = useMemo<Multicall3>(() => {
    return Multicall3__factory.connect(
      platformConfig.multicall3Address,
      signer as any
    );
  }, [signer, platformConfig]);

  /**
   * @dev The helper function to wrap native token to wSOL.
   * @param {BigNumber} wrapTokenAmount The amount of native token to wrap.
   * @returns {object[]} The array of transaction data.
   */
  const wrapNativeTokenHelper = useCallback(
    async (wrapTokenAmount: bigint) => {
      if (!wrapTokenAmount) return [];
      return [
        {
          target: await contract.getAddress(),
          callData: contract.interface.encodeFunctionData("wrapETH", [
            ethWallet?.address?.toString(),
            wrapTokenAmount,
          ]),
          value: wrapTokenAmount,
          allowFailure: false,
        },
      ];
    },
    [platformConfig]
  );

  const submitProposal = useCallback(
    async (
      args: {
        proposalId: string;
        offeredItems: any[];
        askingItems: any[];
        expiredAt: bigint;
      },
      wrapTokenAmount: bigint
    ) => {
      return await multicall3Contract.aggregate3Value([
        ...(await wrapNativeTokenHelper(wrapTokenAmount)),
        {
          target: await contract.getAddress(),
          callData: contract.interface.encodeFunctionData("createProposal", [
            args.proposalId,
            ethWallet?.address?.toString() as string,
            args.offeredItems,
            args.askingItems,
            args.expiredAt,
          ]),
          value: 0,
          allowFailure: false,
        },
      ]);
    },
    [signer, ethWallet, contract, multicall3Contract]
  );

  return {
    contract,
    multicall3Contract,
    submitProposal,
  };
};

export const useEvmToken = () => {
  const { contract } = useEvmHamsterSwapContract();
  const { signer } = useEvmWallet();
  const ethWallet = useAccount();

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
        case 1:
          return (
            (await getTokenContract(tokenAddress).allowance(
              ethWallet?.address,
              contract.getAddress()
            )) >= amount
          );
        case 2:
        default:
          return await getNftContract(tokenAddress).isApprovedForAll(
            contract.getAddress(),
            contract.getAddress()
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
      if (tokenId === 1) return await getTokenContract(tokenAddress).approve(contract.getAddress(),amount);
      return await getNftContract(tokenAddress).setApprovalForAll(
        contract.getAddress(),
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
  const context = useContext(EvmWalletContext);
  if (!context) {
    throw new Error("Must be in provider");
  }
  return context;
};
