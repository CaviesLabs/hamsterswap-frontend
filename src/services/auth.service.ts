import { Auth } from "firebase/auth";
import { useSolana } from "@saberhq/use-solana";

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
   */
  public signInWithWallet() {
    const {} = useSolana();
  }

  /**
   * @dev Defie the function to restrict access token into firebase server.
   */
  public login() {
    //
  }
}
