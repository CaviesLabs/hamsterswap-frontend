import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCustomToken,
  signOut,
  UserCredential,
} from "firebase/auth";
import { SolanaSigner } from "@/src/providers/signature.provider";
import { StorageProvider } from "@/src/providers/storage.provider";
import { UserService } from "./user.service";
import * as bs from "bs58";
import { SIGN_MESSAGE } from "@/src/utils";
import { networkProvider } from "@/src/providers/network.provider";
import { TokenSetEntity } from "@/src/entities/token-set.entity";

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
   * @dev The function to re sigin if user already logged in before.
   */
  public async reAuthenticate() {
    try {
      /** @dev Get auth credential from storage. */
      const authData = await this.getStoredCredentials();

      /** @dev Re-authenticate to Firebase. */
      return this.loginWithFirebase(authData?.email, authData?.password);
    } catch {
      throw new Error("Unauthorized");
    }
  }

  /**
   * @dev The function to sign in with token.
   */
  public async signInWithToken() {
    try {
      const credential = await signInWithCustomToken(
        this.authProvider,
        this.storageProvider.getItem("accessToken")
      );
      return credential.user;
    } catch {
      throw new Error("Unauthorized");
    }
  }

  /**
   * @dev The function to login with Solana wallet.
   * @param {string} walletAddress.
   * @param {string} signedData.
   * @returns {Function}
   */
  public async signInWithWallet(walletAddress: string, signedData: Uint8Array) {
    /** @dev Check if @var {signedData} is valid. */
    if (!SolanaSigner.verify(SIGN_MESSAGE, signedData, walletAddress)) {
      throw new Error("The wallet is not authorized by user");
    }

    /** @dev Check if user not already register before. @*/
    await this.register(
      `${walletAddress}@hamsterbox.xyz`,
      bs.encode(signedData)
    );

    await this.loginWithHamsterApi(walletAddress, signedData);
    /** @dev Login to firebase. */
    return this.loginWithFirebase(
      `${walletAddress}@hamsterbox.xyz`,
      bs.encode(signedData)
    );
  }

  /**
   * @dev Defie the function to create new user with @var {email} & @var {password}
   * @param {string} email.
   * @param {string} password.
   * @return {Function}
   */
  public async register(email: string, password: string) {
    try {
      /**
       * @dev Sign up to Firebase server with username & password.
       */
      const userCredential = await createUserWithEmailAndPassword(
        this.authProvider,
        email,
        password
      );

      /**
       * @dev Create user collection.
       */
      await this.userService.createUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
    } catch (err) {
      console.error(`Error when creating user ${err}`);
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
    identityId: string,
    signedData: Uint8Array
  ): Promise<any> {
    await networkProvider.request(`/auth/challenge/request`, {
      method: "POST",
      data: {
        target: identityId,
      },
    });
    const userCredentials = await networkProvider
      .request(`/user/idp/solana-wallet/availability/check`, {
        method: "POST",
        data: {
          identityId,
        },
      })
      .then(async () => {
        /**
         * @dev Sign up to Hamster server with signature
         * once user haven't registered yet
         */
        const base64Signature = btoa(
          JSON.stringify({
            desiredWallet: identityId,
            rawContent: SIGN_MESSAGE,
            signature: bs.encode(signedData),
          })
        );

        /**
         * @dev Post sign up to Hamster server and save accessToken.
         */
        return await networkProvider.request<TokenSetEntity>(
          `/auth/idp/solana-wallet/sign-up`,
          {
            method: "POST",
            data: {
              base64Signature,
            },
          }
        );
      })
      .catch(async () => {
        /**
         * @dev Sign in to Hamster server with signature
         * once user have registered yet
         */
        const base64Signature = btoa(
          JSON.stringify({
            desiredWallet: identityId,
            signature: bs.encode(signedData),
          })
        );

        /**
         * @dev Post sign in to Hamster server and save accessToken.
         */
        return await networkProvider.request<TokenSetEntity>(
          `/auth/idp/solana-wallet/sign-in`,
          {
            method: "POST",
            data: {
              base64Signature,
            },
          }
        );
      });

    /**
     * @dev Save @var {hAccessToken} into local storage.
     */
    this.storageProvider.setItem(
      "hAccessToken",
      (userCredentials as any).accessToken
    );
  }

  /**
   * @dev The function to logout
   * @return {Function}
   */
  public async logout() {
    /**
     * @dev Logout from Firebase server.
     */
    try {
      await signOut(this.authProvider);
    } catch {}
  }
}
