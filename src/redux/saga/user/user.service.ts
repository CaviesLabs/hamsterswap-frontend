import { networkProvider } from "@/src/providers/network.provider";
import { User } from "firebase/auth";
import { hProfileContactDto } from "@/src/dto/hProfile.dto";
import { DetailDto } from "@/src/dto/detail.dto";

export class UserService {
  async getPublicProfile(data: DetailDto): Promise<User> {
    return networkProvider.request<User>(`/user/profile/${data.id}`, {});
  }
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
