import { networkProvider } from "@/src/providers/network.provider";
import {
  SwapProposalEntity,
  GetProposalsDto,
} from "@/src/entities/proposal.entity";
import { DetailDto } from "@/src/dto/detail.dto";
import { ProposalDto } from "@/src/dto/proposal.dto";
import { ChainId } from "../entities/chain.entity";

export class ProposalService {
  /**
   * @dev Get proposal items.
   * @param {GetProposalsDto} getProposalsDto
   * @returns {SwapProposalEntity} data.
   */
  public async getProposals(
    getProposalsDto?: GetProposalsDto
  ): Promise<SwapProposalEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    return networkProvider.request<SwapProposalEntity>("/proposal", {
      method: "GET",
      params: getProposalsDto
        ? {
            ownerAddresses: getProposalsDto.walletAddress,
            ...getProposalsDto.options,
            limit: 999999,
          }
        : {},
    });
  }

  /**
   * @dev Get list proposal
   * @returns {ProposalDto[]}
   */
  listProposal(): Promise<ProposalDto[]> {
    return networkProvider.request<ProposalDto[]>("/proposal", {});
  }

  /**
   * @dev Get proposal by id.
   * @param {DetailDto} payload
   * @returns {ProposalDto}
   */
  getProposal(payload: DetailDto): Promise<SwapProposalEntity> {
    return networkProvider.request<SwapProposalEntity>(
      `/proposal/${payload.id}`,
      {}
    );
  }

  /**
   * @dev Create proposal.
   * @param {SwapProposalEntity} payload
   * @returns {SwapProposalEntity}
   */
  createProposal(payload: {
    expiredAt: string;
    chainId: string;
    note: string;
  }): Promise<SwapProposalEntity> {
    return networkProvider.requestWithCredentials<SwapProposalEntity>(
      `/proposal`,
      {
        method: "POST",
        data: payload,
      }
    );
  }

  /**
   * @dev The function to sync the data of proposal
   * @param {string} proposalId
   */
  public async syncProposal(proposalId: string): Promise<any> {
    return networkProvider.request(`/proposal/evm/${proposalId}/sync`, {
      method: "PATCH",
    });
  }

  /**
   * @dev Update proposal.
   * @param {ChainId} chainId.
   * @param {string} walletAddress.
   * @returns {ProposalDto}
   */
  syncWalletProposals(chainId: ChainId, walletAddress: string): Promise<void> {
    return networkProvider.request<void>(
      `/proposal/${chainId}/${walletAddress}/sync`,
      {
        method: "POST",
      }
    );
  }
}

export const proposalService = new ProposalService();
export const getProposalService = () => new ProposalService();
