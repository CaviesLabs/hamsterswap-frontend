import { networkProvider } from "@/src/providers/network.provider";
import { hProfileDto } from "@/src/dto/hProfile.dto";

export class ProfileService {
  async getUser(): Promise<hProfileDto> {
    return networkProvider.requestWithCredentials<hProfileDto>(
      "/user/profile",
      {}
    );
  }
}

export const hProfileService = new ProfileService();
