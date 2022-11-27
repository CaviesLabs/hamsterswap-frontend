import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { SolanaSigner } from "@/src/providers/signature.provider";
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
   * @dev Initilize service.
   * @param {Auth} authProvider.
   */
  constructor(authProvider: Auth) {
    /** @dev Import auth provider. */
    this.authProvider = authProvider;
  }

  /**
   * @dev The function to generate access token.
   * @param {any} payload.
   */
  public generateAccessToken(payload: any) {
    //
    console.log(payload);
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
   * @return {Function}
   */
  public async login(email: string, password: string) {
    try {
      /**
       * @dev Sign in to Firebase server with username & password.
       */
      const credential = await signInWithEmailAndPassword(
        this.authProvider,
        email,
        password
      );
      const user = credential.user;
      console.log(user);
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
    return this.authProvider.signOut();
  }
}
