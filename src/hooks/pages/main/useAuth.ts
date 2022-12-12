import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/redux/actions/user/user.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWallet } from "@/src/hooks/useWallet";
import { getAuthService } from "@/src/actions/firebase.action";
import { SIGN_MESSAGE } from "@/src/utils";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";

/**
 * @dev Delayed hook to check if wallet is disconnected, will reset all auth sessions
 * */
let delayed: NodeJS.Timeout;

/** @dev Expore authenticate hook to process tasks related user authentcation */
export const useAuth = () => {
  const dispatch = useDispatch();

  /** @dev Get Wallet info from @saberhq hook. */
  const wallet = useConnectedWallet();

  /** @dev Import signMessage function to use. */
  const { signMessage, disconnect } = useWallet();

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
    /** @dev Get hamster profile. */
    dispatch(
      getHamsterProfile(null, (user) => {
        if (!user) {
          /** Throw error to next block. */
          handleLogin();
        }
      })
    );
  };

  /**
   * @dev Listen wallet changes.
   */
  useEffect(() => {
    /** @dev Force to clear. */
    delayed && clearTimeout(delayed);

    /**
     * @dev Condition to reset or login.
     */
    if (wallet?.publicKey?.toString()) {
      handleAuth();
    } else {
      /**
       * @dev Delayed checking mean when user disconnect completed from wallet, it will reset authentication session.
       */
      console.log("delayed");
      delayed = setTimeout(async () => {
        console.log("disconnect");
        await disconnect();
      }, 3000);
    }

    return () => delayed && clearTimeout(delayed);
  }, [wallet]);
};
