import { createContext, useContext } from "react";
import {
  OfferedItemEntity,
  ExpectedOpitionEntity,
  SwapItemType,
  AssetTypes,
} from "@/src/entities/proposal.entity";
import { NftEntity } from "@/src/dto/nft.dto";

/** @dev Export state contained in page interface */
export interface CreateProposalPageContextState {
  /**
   * @dev Proposal properties.
   */
  offferedItems: OfferedItemEntity[];
  expectedItems: ExpectedOpitionEntity[];
  note: string;
  expiredTime: Date;
  guaranteeSol: number;

  /**
   * @dev Expose function to add offered item.
   * @param item
   * @param type
   */
  addOfferItem(
    item: NftEntity & { nftId: string; assetType: SwapItemType },
    type: AssetTypes,
    amount?: number
  ): void;

  /**
   * @dev Expose function to add expected item.
   * @param item
   * @param type
   * @param opinionIndex
   */
  addExpectedItem(
    item: NftEntity & { nftId: string; assetType: SwapItemType },
    type: AssetTypes,
    opinionIndex: number,
    amount?: number
  ): void;

  /**
   * @dev Expose functionn to remove offered item.
   * @param {string} offeredItemId
   */
  removeOfferItem(offeredItemId: string): void;

  /**
   * @dev Expose function to remove exected item.
   * @param {string} expectedItemId
   */
  removeExpectedItem(expectedItemId: string): void;

  /**
   * @dev Expose function to modify proposal description
   * @param {string} value
   */
  setNote(value: string): void;

  /**
   * @dev Expose function to modify expired time.
   * @param {Date} value
   */
  setExpiredTime(value: Date): void;

  /**
   * @dev Expose functionn to modify guaranteeSol
   * @param {number} value
   */
  setGuaranteeSol(value: number): void;

  /**
   * @dev Expose function to submit proposal to hamster server and on-chain
   */
  submitProposal(): Promise<
    string | { optimize(): Promise<void>; confirm(): Promise<void> }
  >;
}

/** @dev Create context */
export const CreateProposalPageContext =
  createContext<CreateProposalPageContextState>(null);

/** @dev Export use context function */
export const useCreateProposal = () => {
  const context = useContext(CreateProposalPageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
