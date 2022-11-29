import { networkProvider } from "@/src/providers/network.provider";
import { User } from "firebase/auth";

export class UserService {
  async getUser(): Promise<User> {
    return networkProvider.request<User>("/user/get-profile", {});
  }
}

export const userService = new UserService();
