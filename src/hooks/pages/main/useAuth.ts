import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/redux/actions/user/user.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWallet } from "@/src/hooks/useWallet";
import { getUserService, getAuthService } from "@/src/actions/firebase.action";
import { SIGN_MESSAGE } from "@/src/utils";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";

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
    try {
      /** @dev Sign message to get signature. */
      const signature = await signMessage(SIGN_MESSAGE);

      /** @dev Call function to sign message in wallet and login firebase & hamsterbox server. */
      const user = await authService.signInWithWallet(
        wallet?.publicKey?.toString(),
        signature
      );

      /** @dev Get hamster profile. */
      dispatch(getHamsterProfile());

      /** @dev Update user in state. */
      if (user) {
        dispatch(setUser(user?.user));
      }
    } catch {}
  };

  /** @dev The function to handle authentication. */
  const handleAuth = async () => {
    try {
      /** Get user profile. */
      const user = await userService.getProfile();

      /** Force to logout. */
      // await authService.logout();

      if (
        user.email
          .toLowerCase()
          .includes(wallet?.publicKey?.toString().toLowerCase())
      ) {
        /** Try to relogin with stored credentials. */
        dispatch(setUser((await authService.reAuthenticate())?.user));
        /** @dev Get hamster profile. */
        dispatch(getHamsterProfile());
        return;
      }

      /** Throw error to next block. */
      throw Error("HASTN");
    } catch (err) {
      /**
       * This mean user hasnt already login before
       * and process authenticating by sign in a message to blockchain.
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
