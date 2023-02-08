import { CreateProposalToServerDto } from "@/src/entities/proposal.entity";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";

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
