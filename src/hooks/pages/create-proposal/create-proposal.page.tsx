import { ReactNode, useCallback, useState } from "react";
import { CreateProposalPageContext } from "./types";
import { NftEntity } from "@/src/dto/nft.dto";
import {
  OfferedItemEntity,
  ExpectedOpitionEntity,
  AssetTypes,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { SwapProgramService } from "@/src/services/swap-program.service";
import { BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useSelector } from "@/src/redux";
import { ChainId } from "@/src/entities/chain.entity";
import { useSubmitProposalSol } from "./useSubmitProposalSol";
import { useSubmitProposalEvm } from "./useSubmitProposalEvm";

export const CreateProposalProvider = (props: { children: ReactNode }) => {
  /**
   * @dev Initialize state for create proposal.
   * @notice This state will be used in all steps of create proposal.
   */
  const [note, setNote] = useState("");
  const [expiredTime, setExpiredTime] = useState<Date>();
  const [guaranteeSol, setGuaranteeSol] = useState(0);
  const [offferedItems, setOfferItems] = useState<OfferedItemEntity[]>([]);
  const [expectedItems, setExpectedItems] = useState<ExpectedOpitionEntity[]>(
    Array.from(Array(3).keys()).map(() => ({
      id: SwapProgramService.generateUID(),
      askingItems: [],
    }))
  );

  /**
   * @dev Add expected item.
   * @param {NftEntity} item
   * @param {SwapItemType} type
   * @param {number} opinionIndex;
   */
  const addExpectedItem = async (
    item: NftEntity & { nftId: string; assetType: SwapItemType },
    type: AssetTypes,
    opinionIndex: number,
    amount?: number
  ) => {
    setExpectedItems((prev) => {
      return prev.map((opinion, index) => {
        if (index !== opinionIndex) return opinion;
        return {
          ...opinion,
          askingItems: [
            ...opinion.askingItems,
            {
              nftId: item.nftId,
              assetType: item.assetType,
              id: SwapProgramService.generateUID(),
              mintAccount: new PublicKey(item.address),
              itemType: { [type]: {} },
              amount: amount
                ? new BN(amount * Math.pow(10, item.decimal))
                : null,
              nft_address: item.address,
              tokenAmount: amount,
              ...item,
            },
          ],
        };
      });
    });
  };

  /**
   * @dev Remove offer item by id.
   * @param {string} offerItemId
   */
  const removeExpectedItem = async (expectedItemId: string) => {
    setExpectedItems((prev) => {
      return prev.map((item) => {
        return {
          ...item,
          askingItems: item.askingItems.filter(
            (asking) => asking.id !== expectedItemId
          ),
        };
      });
    });
  };

  /**
   * @dev Add offered item.
   * @param {NftEntity} item
   * @param {SwapItemType} type
   */
  const addOfferItem = async (
    item: NftEntity & { nftId: string; assetType: SwapItemType },
    type: AssetTypes,
    amount?: number
  ) => {
    setOfferItems((prev) => {
      return [
        ...prev,
        {
          id: SwapProgramService.generateUID(),
          nftId: item?.nftId,
          assetType: item?.assetType,
          mintAccount: new PublicKey(item.address),
          itemType: { [type]: {} },
          amount: amount ? new BN(amount * Math.pow(10, item.decimal)) : null,
          nft_address: item.address,
          tokenAmount: amount,
          ...item,
        },
      ];
    });
  };

  /**
   * @dev Remove offer item by id.
   * @param {string} offerItemId
   */
  const removeOfferItem = async (offerItemId: string) => {
    setOfferItems((prev) => {
      return prev.filter((item) => item.id !== offerItemId);
    });
  };

  return (
    <CreateProposalPageContext.Provider
      value={{
        offferedItems,
        expectedItems,
        note,
        expiredTime,
        guaranteeSol,
        addOfferItem,
        addExpectedItem,
        removeOfferItem,
        removeExpectedItem,
        setNote,
        setExpiredTime,
        setGuaranteeSol,
      }}
    >
      {props.children}
    </CreateProposalPageContext.Provider>
  );
};

/**
 * @dev This hook will be used in create proposal page.
 * @returns {CreateProposalPageContext}
 */
export const useSubmitProposal = () => {
  const { chainId } = useSelector();
  return {
    submit: useCallback(async () => {
      // eslint-disable-next-line prettier/prettier
      if (chainId === ChainId.solana) return await useSubmitProposalSol().submit();
      return await useSubmitProposalEvm().submit();
    }, [chainId]),
  };
};
