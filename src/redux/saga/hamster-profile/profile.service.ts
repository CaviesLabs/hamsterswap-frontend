import { networkProvider } from "@/src/providers/network.provider";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { DetailDto } from "@/src/dto/detail.dto";

export class ProfileService {
  async getUser(): Promise<hProfileDto> {
    return networkProvider.requestWithCredentials<hProfileDto>(
      "/user/profile",
      {
        method: "GET",
      }
    );
  }
  async getPublicProfile(payload: DetailDto): Promise<hProfileDto> {
    return networkProvider.request<hProfileDto>(`/user/profile/${payload.id}`, {
      method: "GET",
    });
  }
}

export const hProfileService = new ProfileService();
