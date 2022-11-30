import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/redux/actions/user/user.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWallet } from "@/src/hooks/useWallet";
import { getUserService, getAuthService } from "@/src/actions/firebase.action";

/** @dev Expore authenticate hook to process tasks related user authentcation */
export const useAuth = () => {
  const dispatch = useDispatch();

  /** @dev Get Wallet info from @saberhq hook. */
  const wallet = useConnectedWallet();

  /** @dev Import signMessage function to use. */
  const { signMessage } = useWallet();

  /** @dev Import user service. */
  const userService = getUserService();

  /** @dev Import auth service. */
  const authService = getAuthService();

  /** @dev The function to login. */
  const handleLogin = async () => {
    /** @dev Sign message to get signature. */
    const signature = await signMessage("SIGN::IN::HAMSTERBOX");
    const user = await authService.signInWithWallet(
      wallet?.publicKey?.toString(),
      signature
    );
    dispatch(setUser(user.user));
  };

  /** @dev The function to handle authentication. */
  const handleAuth = async () => {
    try {
      /** Get user profile. */
      const user = await userService.getProfile();

      /** Force to logout. */
      await authService.logout();

      if (user.email.includes(wallet?.publicKey?.toString())) {
        /** Try to relogin with stored credentials. */
        return dispatch(setUser((await authService.reAuthenticate()).user));
      }

      /** Throw error to next block. */
      throw Error("HASTN");
    } catch {
      /**
       * This mean user hasnt already login before
       * and process authenticatiing by sign in a message to blockchain.
       * */
      handleLogin();
    }
  };

  /**
   * @dev Listen wallet changes.
   */
  useEffect(() => {
    if (wallet?.publicKey?.toString()) {
      handleAuth();
    }
  }, [wallet]);
};