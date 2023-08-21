import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { StorageProvider } from "@/src/providers/storage.provider";
import { UserService } from "./user.service";
import { SIGN_MESSAGE } from "@/src/utils";
import { networkProvider } from "@/src/providers/network.provider";
import { TokenSetEntity } from "@/src/entities/token-set.entity";
import { ChainId, IdpShortNameMap } from "@/src/entities/chain.entity";

/**
 * @dev Declare service serve for firebase authentication.
 */
export class AuthService {
  /**
   * @dev Auth provider injected.
   */
  private readonly authProvider: Auth;

  /**
   * @dev Auth provider injected.
   */
  private readonly storageProvider: StorageProvider;

  /**
   * @dev User service injected.
   */
  private readonly userService: UserService;

  /**
   * @dev Initilize service.
   * @param {Auth} authProvider.
   * @param {StorageProvider} storageProvider.
   * @param {UserService} userService.
   */
  constructor(
    authProvider: Auth,
    storageProvider: StorageProvider,
    userService: UserService
  ) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;

    /** @dev Import storage provider. */
    this.storageProvider = storageProvider;

    /** @dev Import user service. */
    this.userService = userService;
  }

  /**
   * @dev Get stored credentials.
   */
  public async getStoredCredentials(): Promise<{
    email: string;
    password: string;
  }> {
    try {
      /** @dev Get auth credential from storage. */
      const authData = JSON.parse(
        this.storageProvider.getItem("userCredential")
      );

      return authData as { email: string; password: string };
    } catch {
      throw new Error("Unauthorized");
    }
  }

  /**
   * @dev Define the function to restrict access token into firebase server.
   * @param {string} email.
   * @param {string} password.
   * @return {UserCredential}
   */
  public async loginWithFirebase(
    email: string,
    password: string
  ): Promise<UserCredential> {
    try {
      /**
       * @dev Sign in to Firebase server with username & password.
       */
      const userCredential = await signInWithEmailAndPassword(
        this.authProvider,
        email,
        password
      );

      /**
       * @dev Get user info from credential.
       */
      const { user } = userCredential;

      /**
       * @dev Save @var {accessToken} into storage.
       */
      this.storageProvider.setItem("accessToken", (user as any)?.accessToken);

      /**
       * @dev Decode credential and save to storage.
       */
      this.storageProvider.setItem(
        "userCredential",
        JSON.stringify({ email, password })
      );

      return userCredential;
    } catch {}
  }

  /**
   * @dev Define the function to restrict access token into hamsterswap server.
   * @param {string} identityId.
   * @param {Uint8Array} signedData.
   * @return {UserCredential}
   */
  public async loginWithHamsterApi(
    chainId: ChainId,
    identityId: string,
    signedData: string
  ): Promise<any> {
    await networkProvider.request(`/auth/challenge/request`, {
      method: "POST",
      data: {
        target: identityId,
      },
    });

    const basePayload = {
      desiredWallet: identityId,
      signature: signedData,
    };

    const userCredentials = await networkProvider
      .request(`/user/idp/${IdpShortNameMap[chainId]}/availability/check`, {
        method: "POST",
        data: {
          identityId,
        },
      })
      .then(async () => {
        const base64Signature = btoa(
          JSON.stringify({ ...basePayload, rawContent: SIGN_MESSAGE })
        );

        return await networkProvider.request<TokenSetEntity>(
          `/auth/idp/${IdpShortNameMap[chainId]}/sign-up`,
          {
            method: "POST",
            data: { base64Signature },
          }
        );
      })
      .catch(async () => {
        const base64Signature = btoa(JSON.stringify({ ...basePayload }));
        return await networkProvider.request<TokenSetEntity>(
          `/auth/idp/${IdpShortNameMap[chainId]}/sign-in`,
          {
            method: "POST",
            data: { base64Signature },
          }
        );
      });

    /**
     * @dev Save @var {hAccessToken} into local storage.
     */
    this.storageProvider.setItem(
      "hAccessToken",
      (userCredentials as TokenSetEntity).accessToken
    );
  }

  /**
   * @dev The function to logout
   * @return {Function}
   */
  public async logout() {
    try {
      /**
       * @dev Logout from hamster server.
       */
      await networkProvider.requestWithCredentials(`/auth/logout`, {
        method: "POST",
      });

      /**
       * @dev Remove stroaged session.
       */
      this.storageProvider.removeItem("hAccessToken");
      this.storageProvider.removeItem("userCredential");
      this.storageProvider.removeItem("accessToken");
      this.storageProvider.removeItem("use-solana/wallet-config", true);
      this.storageProvider.removeItem("walletName", true);
    } catch {}
  }
}
