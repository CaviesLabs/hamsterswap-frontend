import { Auth } from "firebase/auth";

export class UserService {
  /**
   * @dev Auth provider injected.
   */
  private readonly authProvider: Auth;

  /**
   * @dev Initilize service.
   * @param {Auth} authProvider.
   */
  constructor(authProvider: Auth) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;
  }

  /**
   * @dev Get profile.
   */
  public async getProfile() {
    const user = this.authProvider.currentUser;
    if (!user) {
      throw new Error("Unauthorized");
    }
    return user;
  }
}
