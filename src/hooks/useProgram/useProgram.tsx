import { useCallback, useMemo } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { useEvmHamsterSwapContract } from "@/src/hooks/wagmi/useEvmWallet";
import { ChainId } from "@/src/entities/chain.entity";
import { useMain } from "@/src/hooks/pages/main";

/**
 * @dev Export hook to use.
 */
export const useProgram = () => {
  const { chainId } = useMain();
  const { provider: solanaProvider, programService } = useWallet();

  const {
    cancelProposal: cancelProposalEvm,
    fullFillProposal: swapProposalEvm,
  } = useEvmHamsterSwapContract();

  /**
   * @dev The function to redeem proposal.
   * @param {string} proposalId
   */
  const redeemProposal = useCallback(
    async (proposalId: string) => {
      // eslint-disable-next-line prettier/prettier
      if (chainId === ChainId.solana) return programService.redeemProposal(solanaProvider, proposalId);
    },
    [programService, solanaProvider, chainId]
  );

  /**
   * @dev The function to cancel proposal.
   * @param {string} proposalId
   */
  const cancelProposal = useCallback(
    async (proposalId: string) => {
      // eslint-disable-next-line prettier/prettier
      if (chainId === ChainId.solana) return programService.cancelProposal(solanaProvider, proposalId);
      return await cancelProposalEvm({ proposalId });
    },
    [solanaProvider, programService, chainId]
  );

  /**
   * @dev The function to swap proposal.
   * @param {string} proposalId
   * @param {string} optionId
   * @returns {Promise<void>}
   */
  const swapProposal = useCallback(
    async (
      proposalId: string,
      optionId: string,
      wrappedTokenAmount: bigint
    ) => {
      if (chainId === ChainId.solana)
        return programService.swapProposal(
          solanaProvider,
          proposalId,
          optionId
        );
      return await swapProposalEvm({
        proposalId,
        optionId,
        wrappedTokenAmount,
      });
    },
    [solanaProvider, programService, chainId, swapProposalEvm]
  );

  return useMemo(
    () => ({
      redeemProposal,
      cancelProposal,
      swapProposal,
    }),
    [
      redeemProposal,
      cancelProposal,
      swapProposalEvm,
      cancelProposalEvm,
      solanaProvider,
      programService,
      chainId,
    ]
  );
};
