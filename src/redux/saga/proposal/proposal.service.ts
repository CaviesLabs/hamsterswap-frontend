import { networkProvider } from "@/src/providers/network.provider";
import { ProposalItem } from "@/src/components/user/types";

export class ProposalService {
  listProposal(): Promise<ProposalItem[]> {
    return networkProvider.request<ProposalItem[]>("/proposal", {});
  }
  getProposal(id: string): Promise<ProposalItem> {
    return networkProvider.request<ProposalItem>(`/proposal/${id}`, {});
  }
}

export const proposalService = new ProposalService();
