import { AuthService } from "@/src/services/auth.service";
import { StorageProvider } from "@/src/providers/storage.provider";

export class UserService {
  /**
   * @dev Auth service injected.
   */
  private readonly authService: AuthService;

  /**
   * @dev Storage provider injected.
   */

  /**
   * @dev Initilize service.
   * @param {Auth} authProvider.
   * @param {StorageProvider} storageProvider.
   */
  constructor(storageProvider: StorageProvider) {
    /** @dev Import storage provider. */
    this.authService = new AuthService(storageProvider);
  }

  /**
   * @dev Get profile.
   */
  public async getProfile() {
    // const user = this.authProvider.currentUser;
    // if (!user) {
    //   return await this.authService.getStoredCredentials();
    // }
    // return user;
  }
}
