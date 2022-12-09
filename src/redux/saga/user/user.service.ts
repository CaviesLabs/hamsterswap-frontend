import { networkProvider } from "@/src/providers/network.provider";
import { hProfileContactDto } from "@/src/dto/hProfile.dto";

export class UserService {
  async updateUser(data: hProfileContactDto): Promise<hProfileContactDto> {
    return networkProvider.requestWithCredentials<hProfileContactDto>(
      "/user/profile",
      {
        method: "PATCH",
        data,
      }
    );
  }
}

export const userService = new UserService();
