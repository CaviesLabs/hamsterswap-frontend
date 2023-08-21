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
  Etherman,
  Etherman__factory,
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
   * @returns {Etherman} contract instance.
   */
  const contract = useMemo<HamsterSwap>(() => {
    return HamsterSwap__factory.connect(
      platformConfig.programAddress,
      signer as any
    );
  }, [signer, platformConfig]);

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
    submitProposal,
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
