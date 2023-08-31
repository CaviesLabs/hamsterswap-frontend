import { AuthService } from "@/src/services/auth.service";
import { UserService } from "@/src/services/user.service";
import { getStorageProvider } from "@/src/providers";

const storageProvider = getStorageProvider();

/** @dev Expose function to initilzize auth and user service. */
export const getUserService = (): UserService => {
  return new UserService(storageProvider);
};

/** @dev Expose function to initilzize auth service. */
export const getAuthService = (): AuthService => {
  return new AuthService(storageProvider);
};
