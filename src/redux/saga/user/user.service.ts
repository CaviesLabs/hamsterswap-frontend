import { networkProvider } from "@/src/providers/network.provider";
import { UserEntity } from "@/src/entities/user.entity";

export class UserService {
  async getUser(): Promise<UserEntity> {
    return networkProvider.request<UserEntity>("/user/get-profile", {});
  }
}

export const userService = new UserService();
