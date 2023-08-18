import { CreateProposalToServerDto } from "@/src/entities/proposal.entity";
import { AugmentedProvider as WalletProvider } from "@saberhq/solana-contrib";

/**
 * @dev The interface for swap service.
 */
export interface ISwapProgramService {
  /**
   * @dev The function to create proposal onchain & offchain.
   * @param {WalletProvider} walletProvider
   * @param {CreateProposalToServerDto} createProposalDto
   */
  createProposal(
    walletProvider: WalletProvider,
    createProposalDto: CreateProposalToServerDto
  ): Promise<
    | string
    | {
        id: string;
        fnc: { optimize(): Promise<void>; confirm(): Promise<void> };
      }
  >;
}
