import { useCallback } from "react";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@/src/hooks/useWallet";
import { useAppWallet } from "@/src/hooks/useAppWallet";
import { useCreateProposal } from "./types";
import * as anchor from "@project-serum/anchor";

export const useSubmitProposalSol = (): {
  submit(): Promise<
    | string
    | {
        proposalId: string;
        fnc: { optimize(): Promise<void>; confirm(): Promise<void> };
      }
  >;
} => {
  const { walletAddress } = useAppWallet();
  const { provider: solanaProvider, programService } = useWallet();
  const { note, offferedItems, expectedItems, expiredTime } =
    useCreateProposal();

  return {
    submit: useCallback(async () => {
      if (!walletAddress) return;
      return await programService.createProposal(solanaProvider, {
        note,
        ownerAddress: walletAddress,
        swapOptions: expectedItems
          .filter((item) => item.askingItems.length)
          .map((item) => ({
            id: item.id.slice(0, 10),
            askingItems: item.askingItems.map((askingItem) => ({
              id: askingItem.id.slice(0, 10),
              mintAccount: new PublicKey(askingItem.address),
              amount: askingItem.amount ? askingItem.amount : new anchor.BN(1),
              itemType: askingItem.itemType,
            })),
          })),
        offeredOptions: offferedItems.map((item) => ({
          id: item.id.slice(0, 10),
          mintAccount: new PublicKey(item.address),
          amount: item.amount ? item.amount : new anchor.BN(1),
          itemType: item.itemType,
        })),
        expiredAt: expiredTime,
      });
    }, [note, offferedItems, expectedItems, expiredTime]),
  };
};
