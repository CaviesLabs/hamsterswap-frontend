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
import * as bs from "bs58";

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
   * @dev Initilize service.
   * @param {Auth} authProvider.
   */
  constructor(authProvider: Auth, storageProvider: StorageProvider) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;

    /** @dev Import storage provider. */
    this.storageProvider = storageProvider;
  }

  /**
   * @dev The function to re sigin if user already logged in before.
   */
  public async reAuthenticate() {
    try {
      /** @dev Get auth credential from storage. */
      const authData = JSON.parse(
        this.storageProvider.getItem("userCredential")
      );

      /** @dev Re-authenticate to Firebase. */
      return this.login(authData?.email, authData?.password);
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
    if (
      !SolanaSigner.verify("SIGN::IN::HAMSTERBOX", signedData, walletAddress)
    ) {
      throw new Error("The wallet is not authorized by user");
    }

    /** @dev Check if user not already register before. @*/
    await this.register(
      `${walletAddress}@hamsterbox.xyz`,
      bs.encode(signedData)
    );

    /** @dev Login to firebase. */
    return this.login(`${walletAddress}@hamsterbox.xyz`, bs.encode(signedData));
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
      await createUserWithEmailAndPassword(this.authProvider, email, password);
    } catch {}
  }

  /**
   * @dev Defie the function to restrict access token into firebase server.
   * @param {string} email.
   * @param {string} password.
   * @return {UserCredential}
   */
  public async login(email: string, password: string): Promise<UserCredential> {
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
