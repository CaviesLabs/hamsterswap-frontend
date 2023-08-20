import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuthService } from "@/src/actions/auth.action";
import { getHamsterProfile } from "@/src/redux/actions/hamster-profile/profile.action";
import {
  useAppWallet,
  useDisconnectWallet,
  useIdpSignMessage,
} from "@/src/hooks/useAppWallet";
import { useSelector } from "@/src/redux";

/** @dev Expore authenticate hook to process tasks related user authentcation */
export const useAuth = () => {
  const dispatch = useDispatch();
  const authService = getAuthService();
  const { chainId } = useSelector();
  const { walletAddress } = useAppWallet();
  const { disconnect } = useDisconnectWallet();
  const { signIdpMessage } = useIdpSignMessage();

  /**
   * @dev The function is used to login user with hamster api.
   * @notice Step 1: Sign message with wallet address and get signature for each chain.
   * @notice Step 2: Call api to login with signature.
   * @notice Step 3: Update user profile and store in redux state.
   */
  const handleLogin = useCallback(async () => {
    try {
      const signature = await signIdpMessage();
      await authService.loginWithHamsterApi(chainId, walletAddress, signature);
      dispatch(getHamsterProfile());
    } catch {}
  }, [walletAddress, chainId]);

  /**
   * @dev This hook is used to watch changes in wallet address and chainId.
   * @notice If wallet address is changed, it will check if user is logged in or not.
   */
  useEffect(() => {
    if (!walletAddress) return;
    dispatch(
      getHamsterProfile(null, (user) => {
        if (!user) {
          return handleLogin();
        }
      })
    );
  }, [walletAddress, chainId, disconnect, signIdpMessage]);
};
