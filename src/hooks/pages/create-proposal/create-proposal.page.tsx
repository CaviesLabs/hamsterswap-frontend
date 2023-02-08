import { ReactNode, useState, useCallback } from "react";
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
import { useWallet } from "@/src/hooks/useWallet";
import * as anchor from "@project-serum/anchor";

export const CreateProposalProvider = (props: { children: ReactNode }) => {
  /**
   * @dev Get wallet.
   */
  const { solanaWallet, programService } = useWallet();

  /**
   * @dev Items which user want to swap.
   */
  const [offferedItems, setOfferItems] = useState<OfferedItemEntity[]>([]);

  /**
   * @dev Options of item which user want to recive.
   */
  const [expectedItems, setExpectedItems] = useState<ExpectedOpitionEntity[]>(
    Array.from(Array(3).keys()).map(() => ({
      id: SwapProgramService.generateUID(),
      askingItems: [],
    }))
  );

  /**
   * @dev Description of proposal.
   */
  const [note, setNote] = useState("");

  /**
   * @dev Expired time of proposal, default is 7 days from now.
   */
  const [expiredTime, setExpiredTime] = useState<Date>();

  const [guaranteeSol, setGuaranteeSol] = useState(0);

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
              mintAccount: new PublicKey(item.nft_address),
              itemType: { [type]: {} },
              amount: amount
                ? new BN(amount * Math.pow(10, item.decimal))
                : null,
              nft_address: item.nft_address,
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
    console.log("add", amount, item.decimal);
    setOfferItems((prev) => {
      return [
        ...prev,
        {
          nftId: item?.nftId,
          assetType: item?.assetType,
          id: SwapProgramService.generateUID(),
          mintAccount: new PublicKey(item.nft_address),
          itemType: { [type]: {} },
          amount: amount ? new BN(amount * Math.pow(10, item.decimal)) : null,
          nft_address: item.nft_address,
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

  /**
   * @dev Submit proposal to Hamster server and on-chain.
   */
  const submitProposal = useCallback(async () => {
    if (!solanaWallet.publicKey) return;
    /**
     * @dev Initialize params to create proposal program.
     */
    const createdData = {
      note,
      ownerAddress: solanaWallet?.publicKey?.toString(),
      swapOptions: expectedItems
        .filter((item) => item.askingItems.length)
        .map((item) => ({
          id: item.id,
          askingItems: item.askingItems.map((askingItem) => ({
            mintAccount: new PublicKey(askingItem.nft_address),
            id: askingItem.id,
            amount: askingItem.amount ? askingItem.amount : new anchor.BN(1),
            itemType: askingItem.itemType,
          })),
        })),
      offeredOptions: offferedItems.map((item) => ({
        mintAccount: new PublicKey(item.nft_address),
        id: item.id,
        amount: item.amount ? item.amount : new anchor.BN(1),
        itemType: item.itemType,
      })),
      expiredAt: expiredTime,
    };

    /**
     * @dev Create proposal
     *  - Hamster server
     *  - Solana chain
     */
    return await programService.createProposal(solanaWallet, createdData);
  }, [
    expectedItems,
    offferedItems,
    note,
    expiredTime,
    guaranteeSol,
    solanaWallet,
  ]);

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
        submitProposal,
      }}
    >
      {props.children}
    </CreateProposalPageContext.Provider>
  );
};
