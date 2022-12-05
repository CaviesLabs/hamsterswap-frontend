import { BN } from "@project-serum/anchor";
import { networkProvider } from "@/src/providers/network.provider";
import { SwapProgramProvider } from "@/src/providers/swap-program";
import {
  CreateProposalToServerDto,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { uuid } from "uuidv4";

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
    walletProvider: WalletProvider,
    createProposalDto: CreateProposalToServerDto
  ) {
    /**
     * @dev Call to HamsterBox server to initialize the proposal.
     */
    const response =
      await networkProvider.requestWithCredentials<SwapProposalEntity>(
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

  /**
   * @dev The function to cancel proposal on-chain.
   * @param {WalletProvider} walletProvider
   * @param {string} proposalId.
   * @returns
   */
  public async cancelProposal(
    walletProvider: WalletProvider,
    proposalId: string
  ) {
    return this.swapProgramProvider.cancelProposal(walletProvider, proposalId);
  }

  public static generateUID() {
    return uuid().slice(0, 10);
  }
}
