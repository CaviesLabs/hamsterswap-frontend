import { networkProvider } from "@/src/providers/network.provider";
import { DetailDto } from "@/src/dto/detail.dto";
import { CreateProposalDto, ProposalDto } from "@/src/dto/proposal.dto";

export class ProposalService {
  listProposal(): Promise<ProposalDto[]> {
    return networkProvider.request<ProposalDto[]>("/proposal", {});
  }
  getProposal(payload: DetailDto): Promise<ProposalDto> {
    return networkProvider.request<ProposalDto>(`/proposal/${payload.id}`, {});
  }
  createProposal(payload: CreateProposalDto): Promise<ProposalDto> {
    return networkProvider.request<ProposalDto>(`/proposal/`, {
      method: "POST",
      data: payload,
    });
  }
}

export const proposalService = new ProposalService();
