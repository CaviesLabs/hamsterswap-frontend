import { networkProvider } from "@/src/providers/network.provider";
import { SwapProgramProvider } from "@/src/providers/swap-program";
import {
  CreateProposalToServerDto,
  CreateProposalServerResponse,
} from "@/src/entities/proposal.entity";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";

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
   * @param {SignerWalletAdapter} signer.
   * @param {CreateProposalToServerDto} createProposalDto.
   */
  public async createProposal(
    signer: SignerWalletAdapter,
    createProposalDto: CreateProposalToServerDto
  ) {
    /**
     * @dev Call to HamsterBox server to initialize the proposal.
     */
    const response =
      await networkProvider.request<CreateProposalServerResponse>("/proposal", {
        method: "POST",
        data: createProposalDto,
      });

    /**
     * @dev Now create proposal to on-chain.
     */
    await this.swapProgramProvider.createProposal(signer, {
      id: response.id,
      ...createProposalDto,
    });
  }
}
