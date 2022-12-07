import { useCallback } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { ProgramHookState } from "./types";

/**
 * @dev Export hook to use.
 */
export const useProgram = (): ProgramHookState => {
  /**
   * @dev Import services.
   */
  const { solanaWallet, programService } = useWallet();

  /**
   * @dev The function to redeem proposal.
   * @param {string} proposalId
   */
  const redeemProposal = useCallback(
    async (proposalId: string) => {
      if (!solanaWallet.publicKey || !programService) return;

      /**
       * @dev Call service to redeem proposal.
       */
      await programService.redeemProposal(solanaWallet, proposalId);
    },
    [solanaWallet, programService]
  );

  /**
   * @dev The function to cancel proposal.
   * @param {string} proposalId
   */
  const cancelProposal = useCallback(
    async (proposalId: string) => {
      if (!solanaWallet.publicKey || !programService) return;
      /**
       * @dev Call service to cancel proposal.
       */
      try {
        await programService.cancelProposal(solanaWallet, proposalId);
      } catch (err) {
        console.log(err);
      }
    },
    [solanaWallet, programService]
  );

  return {
    redeemProposal,
    cancelProposal,
  };
};
