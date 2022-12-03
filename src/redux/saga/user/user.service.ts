import { networkProvider } from "@/src/providers/network.provider";
import { User } from "firebase/auth";
import { hProfileContactDto } from "@/src/dto/hProfile.dto";

export class UserService {
  async getUser(): Promise<User> {
    return networkProvider.request<User>("/user/get-profile", {});
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
