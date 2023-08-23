import { networkProvider } from "@/src/providers/network.provider";
import {
  SwapProposalEntity,
  GetProposalsDto,
} from "@/src/entities/proposal.entity";
import { DetailDto } from "@/src/dto/detail.dto";
import { CreateProposalDto, ProposalDto } from "@/src/dto/proposal.dto";
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
  getProposal(payload: DetailDto): Promise<ProposalDto> {
    return networkProvider.request<ProposalDto>(`/proposal/${payload.id}`, {});
  }

  /**
   * @dev Create proposal.
   * @param {CreateProposalDto} payload.
   * @returns {ProposalDto}
   */
  createProposal(payload: CreateProposalDto): Promise<ProposalDto> {
    return networkProvider.request<ProposalDto>(`/proposal/`, {
      method: "POST",
      data: payload,
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
