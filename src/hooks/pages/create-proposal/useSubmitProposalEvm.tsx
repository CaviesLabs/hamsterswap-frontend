import { useCallback } from "react";
import { SwapItemType } from "@/src/entities/proposal.entity";
import { BN } from "@project-serum/anchor";
import { useAppWallet, useNativeToken } from "@/src/hooks/useAppWallet";
import { useCreateProposal } from "./types";
import { useSelector } from "@/src/redux";
import { EvmTokenService } from "@/src/services/token-evm.service";
import { useEvmHamsterSwapContract } from "@/src/hooks/wagmi";
import { SwapProposalEntity } from "@/src/entities/proposal.entity";
import { networkProvider } from "@/src/providers/network.provider";

export const useSubmitProposalEvm = () => {
  const { chainId } = useSelector();
  const { walletAddress } = useAppWallet();
  const { nativeToken } = useNativeToken();
  const { submitProposal } = useEvmHamsterSwapContract();
  const { note, offferedItems, expectedItems, expiredTime } =
    useCreateProposal();

  /**
   * @dev The function to convert sol amount to evm amount.
   * @param {BN} source The amount value in sol.
   * @param {number} decimals The decimals of token.
   * @param {number} realDecimals The real decimals of token.
   * @returns {BigInt} The amount value in evm.
   */
  const convertSolAmountToEvmAmount = (
    source: BN,
    decimals: number,
    realDecimals: number
  ) => {
    return new EvmTokenService(chainId).convertTokenAmountToDecimal(
      source.toNumber() / Math.pow(10, decimals),
      realDecimals
    );
  };

  /**
   * @dev The function to convert swap options to evm swap options.
   * @notice Filter the swap options that have no asking items.
   * @returns {SwapOption[]} The evm swap options.
   */
  const convertSwapOptionsHelper = useCallback(
    () =>
      expectedItems
        .filter((item) => item.askingItems.length)
        .map((item) => ({
          id: item.id,
          askingItems: item.askingItems.map((askingItem) => ({
            id: askingItem.id,
            contractAddress: askingItem.address,
            tokenId: askingItem.assetType === SwapItemType.CURRENCY ? 1 : 2,
            amount: askingItem.amount
              ? convertSolAmountToEvmAmount(
                  askingItem.amount,
                  askingItem.decimal,
                  askingItem.realDecimals
                )
              : BigInt(1),
          })),
        })),
    [expectedItems, convertSolAmountToEvmAmount]
  );

  /**
   * @dev The function to convert offered items to evm offered items.
   * @notice Filter the offered items that have no asking items.
   * @returns {OfferedItem[]} The evm offered items.
   */
  const convertOfferedItemsHelper = useCallback(
    () =>
      offferedItems.map((item) => ({
        id: item.id,
        contractAddress: item.address,
        tokenId: item.assetType === SwapItemType.CURRENCY ? 1 : 2,
        amount: item.amount
          ? convertSolAmountToEvmAmount(
              item.amount,
              item.decimal,
              item.realDecimals
            )
          : BigInt(1),
      })),
    [offferedItems, convertSolAmountToEvmAmount]
  );

  /**
   * @dev The function to get wrap token amount.
   * @notice Find the wrap token amount in offered items.
   * @returns {BigNumber} The wrap token amount.
   */
  const getWrapTokenAmount = useCallback(() => {
    return convertOfferedItemsHelper()
      .filter((item) => item.tokenId === 1)
      .find((item) => item.contractAddress === nativeToken?.address).amount;
  }, [nativeToken, convertOfferedItemsHelper]);

  return {
    convertOfferedItemsHelper,
    submit: useCallback(async () => {
      if (!walletAddress) return;
      const response =
        await networkProvider.requestWithCredentials<SwapProposalEntity>(
          "/proposal",
          {
            method: "POST",
            data: {
              expiredAt: expiredTime,
              chainId,
              note,
            },
          }
        );

      await submitProposal(
        {
          proposalId: response.id,
          offeredItems: convertSwapOptionsHelper(),
          askingItems: convertOfferedItemsHelper(),
          expiredAt: BigInt(expiredTime.getTime() / 1000),
        },
        await getWrapTokenAmount()
      );
    }, [note, offferedItems, expectedItems, expiredTime]),
  };
};
