import { BN } from "@project-serum/anchor";
import { networkProvider } from "@/src/providers/network.provider";
import { SwapProgramProvider } from "@/src/providers/swap-program";
import {
  CreateProposalToServerDto,
  CreateProposalServerResponse,
} from "@/src/entities/proposal.entity";
import { WalletContextState as SolanaWalletContextState } from "@solana/wallet-adapter-react";
// import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";

export class SwapProgramService {
  /**
   * @dev Program provider injected.
   */
  private readonly swapProgramProvider: SwapProgramProvider;

  constructor(swapProgramProvider: SwapProgramProvider) {
    /**
     * @dev Import providers.
     */
    this.swapProgramProvider = swapProgramProvider;
  }

  /**
   * @dev Call this function to create new proposal.
   * @param {CreateProposalToServerDto} createProposalDto.
   */
  public async createProposal(
    walletProvider: SolanaWalletContextState,
    createProposalDto: CreateProposalToServerDto
  ) {
    /**
     * @dev Call to HamsterBox server to initialize the proposal.
     */
    const response =
      await networkProvider.requestWithCredentials<CreateProposalServerResponse>(
        "/proposal",
        {
          method: "POST",
          data: createProposalDto,
        }
      );

    /**
     * @dev Now create proposal to on-chain.
     */
    await this.swapProgramProvider.createProposal(walletProvider, {
      id: response.id,
      expiredAt: new BN(createProposalDto.expiredAt.getTime()),
      ...createProposalDto,
    });
  }
}
