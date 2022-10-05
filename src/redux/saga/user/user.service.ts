import { NetworkProvider } from "@/src/providers/network.provider";
import { UserEntity } from "@/src/entities/user.entity";

export class UserService extends NetworkProvider {
  public async getUser(): Promise<UserEntity> {
    return this.request<UserEntity>("/user/get-profile", {});
  }
}

export const userService = new UserService();
