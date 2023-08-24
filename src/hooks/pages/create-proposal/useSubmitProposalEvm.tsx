import { useCallback } from "react";
import { SwapItemType } from "@/src/entities/proposal.entity";
import { BN } from "@project-serum/anchor";
import { useAppWallet, useNativeToken } from "@/src/hooks/useAppWallet";
import { useCreateProposal } from "./types";
import { EvmTokenService } from "@/src/services/token-evm.service";
import { useEvmHamsterSwapContract, useEvmWallet } from "@/src/hooks/wagmi";
import { getProposalService } from "@/src/services/proposal.service";
import { useMain } from "@/src/hooks/pages/main";

export const useSubmitProposalEvm = () => {
  const { chainId, nft: ownerNfts, platformConfig } = useMain();
  const { walletAddress } = useAppWallet();
  const { nativeToken } = useNativeToken();
  const { submitProposal } = useEvmHamsterSwapContract();
  const { signer } = useEvmWallet();
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

  const getRealAddress = useCallback(
    (address: string, assetTpe: SwapItemType) => {
      if (assetTpe === SwapItemType.CURRENCY) {
        return platformConfig?.allowCurrencies?.find(
          (item) => item.address === address
        )?.realAddress;
      } else {
        return ownerNfts?.find((item) => item.address === address)?.realAddress;
      }
    },
    [ownerNfts, platformConfig]
  );

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
            itemType: askingItem.assetType === SwapItemType.NFT ? 0 : 1,
            tokenId:
              askingItem.assetType === SwapItemType.CURRENCY
                ? 0
                : askingItem.tokenId,
            contractAddress: getRealAddress(
              askingItem.address,
              askingItem.assetType
            ),
            amount: askingItem.amount
              ? convertSolAmountToEvmAmount(
                  askingItem.amount,
                  askingItem.decimals,
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
        itemType: item.assetType === SwapItemType.NFT ? 0 : 1,
        contractAddress: getRealAddress(item.address, item.assetType),
        tokenId: item.assetType === SwapItemType.CURRENCY ? 0 : item.tokenId,
        amount: item.amount
          ? convertSolAmountToEvmAmount(
              item.amount,
              item.decimals,
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
      .filter((item) => !item.tokenId)
      .find((item) => item.contractAddress === nativeToken?.realAddress)
      ?.amount;
  }, [nativeToken, convertOfferedItemsHelper]);

  return {
    convertOfferedItemsHelper,
    submit: useCallback(async () => {
      if (!walletAddress) return;
      const proposalService = getProposalService();

      const response = await proposalService.createProposal({
        expiredAt: expiredTime.toISOString(),
        chainId,
        note,
      });

      const fnc = await submitProposal(
        {
          proposalId: response.id,
          offeredItems: convertOfferedItemsHelper(),
          swapOptions: convertSwapOptionsHelper(),
          expiredAt: BigInt((expiredTime.getTime() / 1000).toFixed(0)),
        },
        await getWrapTokenAmount()
      );

      // Delay to sync proposal after create.
      setTimeout(
        async () => await proposalService.syncProposal(response.id),
        4000
      );

      return {
        proposalId: response.id,
        fnc: fnc,
      };
    }, [
      note,
      offferedItems,
      expectedItems,
      expiredTime,
      walletAddress,
      platformConfig,
      signer,
    ]),
  };
};
