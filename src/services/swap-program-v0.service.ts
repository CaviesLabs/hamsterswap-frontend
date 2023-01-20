import { BN } from "@project-serum/anchor";
import { networkProvider } from "@/src/providers/network.provider";
import { SwapProgramProviderV0 } from "@/src/providers/program/swap-program-v0.provider";
import UtilsProvider from "@/src/utils/utils.provider";
import {
  CreateProposalToServerDto,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { uuid } from "uuidv4";

export class SwapProgramServiceV0 {
  /**
   * @dev Program provider injected.
   * @private
   */
  private readonly swapProgramProvider: SwapProgramProviderV0;
  private readonly utilsProvider: UtilsProvider;

  constructor(swapProgramProvider: SwapProgramProviderV0) {
    /**
     * @dev Import providers.
     */
    this.swapProgramProvider = swapProgramProvider;
    this.utilsProvider = new UtilsProvider();
  }

  /**
   * @dev Call this function to create new proposal.
   * @param walletProvider
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
        { method: "POST", data: createProposalDto }
      );

    /**
     * @dev Create on-chain.
     * @returns {id: string, { optimize(): Promise<void>; confirm(): Promise<void> }}
     */
    return {
      proposalId: response?.id,
      fnc: await this.swapProgramProvider.createProposal(walletProvider, {
        id: response.id,
        expiredAt: new BN(createProposalDto.expiredAt.getTime()),
        ...createProposalDto,
      }),
    };
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
    /**
     * @dev Call to program.
     * @returns {id: string, { optimize(): Promise<void>; confirm(): Promise<void> }}
     */
    return {
      proposalId,
      fnc: await this.swapProgramProvider.cancelProposal(
        walletProvider,
        await this.getProposal(proposalId)
      ),
    };
  }

  /**
   * @dev Call this function when user want to wrap proposal.
   * @param {WalletProvider} walletProvider.
   * @param {string} proposalId.
   * @param {string} optionId.
   * @returns
   */
  public async swapProposal(
    walletProvider: WalletProvider,
    proposalId: string,
    optionId: string
  ) {
    /**
     * @dev Now create proposal to on-chain, wrap in sync function to sync data after done processing on-chain.
     */
    return {
      proposalId,
      fnc: await this.swapProgramProvider.swapProposal(
        walletProvider,
        await this.getProposal(proposalId),
        optionId
      ),
    };
  }

  /**
   * @dev The function to withdraw nfts to proposer owner.
   * @param {WalletProvider} walletProvider
   * @param {string} proposalId
   */
  public async redeemProposal(
    walletProvider: WalletProvider,
    proposalId: string
  ) {
    return {
      proposalId,
      fnc: await this.swapProgramProvider.redeemProposal(
        walletProvider,
        await this.getProposal(proposalId)
      ),
    };
  }

  /**
   * @dev Sync proposal by id.
   */
  public async requestAndSyncProposal(
    proposalId: string,
    fn: () => Promise<any>
  ): Promise<any> {
    /**
     * @dev {Network}
     */
    const data = await fn();
    return new Promise(async (resolve) =>
      setTimeout(async () => {
        await this.syncProposal(proposalId);
        resolve(data);
      }, 4000)
    );
  }

  /**
   * @dev The function to sync the data of proposal
   * @param {string} proposalId
   */
  public async syncProposal(proposalId: string): Promise<any> {
    return networkProvider.request(`/proposal/${proposalId}/sync`, {
      method: "PATCH",
    });
  }

  /**
   * @dev Find proposal by id.
   * @param {string} proposalId
   * @returns {SwapProposalEntity}
   */
  public async getProposal(proposalId: string): Promise<SwapProposalEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return networkProvider.requestWithCredentials<SwapProposalEntity>(
      `/proposal/${proposalId}`,
      { method: "GET" }
    );
  }

  /**
   * @dev Generate id following uuid types.
   * @static
   * @returns {string}
   */
  public static generateUID() {
    return uuid().slice(0, 10);
  }
}
