import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "./types";
import { useUI } from "./useUI";
import { useAuth } from "./useAuth";
import { useRouter } from "./useRouter";
import { getPlatformConfig } from "@/src/redux/actions/platform-config/platform.action";
import { StorageProvider } from "@/src/providers/storage.provider";
import { ChainId, DEFAULT_CHAINS } from "@/src/entities/chain.entity";
import { setChainId as setReduxChainId } from "@/src/redux/actions/user/user.action";
import ReduxState from "@/src/redux/entities/state";

export const MainProvider = (props: { children: ReactNode }) => {
  /**
   * @dev Import needed hooks.
   * @dev Import needed redux hooks.
   * @dev Import needed redux actions.
   */
  const reduxState = useSelector((app: ReduxState) => app);
  const dispatch = useDispatch();

  /**
   * @dev Import needed hooks.
   * @dev Import needed router hooks.
   */
  const { transitionLoading, fistLoading } = useRouter();
  const [nftModal, setNftModal] = useState(false);
  const [chainId, setChainId] = useState<ChainId>();

  /**
   * @dev The function to open NFT detail modal.
   * @returns {void}
   */
  const openNftDetailModal = useCallback(() => setNftModal(true), [nftModal]);

  /**
   * @dev Call hooks to detect router changes.
   * @returns {void}
   */
  useUI();
  useAuth();

  /**
   * @dev Call hooks to get platform config when component mounted.
   * @returns {void}
   */
  useEffect(() => {
    dispatch(getPlatformConfig(chainId));
  }, [chainId]);

  /**
   * @dev Call hooks to get chain id when component mounted.
   * @notice This is temporary solution.
   * @notice Default chain id is solana.
   * @returns {void}
   */
  useEffect(() => {
    const chainId =
      (new StorageProvider().getItem("CHAIN_ID") as ChainId) || ChainId.klaytn;
    setChainId(chainId);
  }, []);

  /**
   * @dev The function to select chain.
   * @param {ChainId} chainId.
   * @step1 Set chain id to state.
   * @step2 Set chain id to local storage.
   * @returns {void}
   */
  const selectChain = useCallback(
    (chainId: ChainId) => {
      setChainId(chainId);
      new StorageProvider().setItem("CHAIN_ID", chainId);
      dispatch(setReduxChainId(chainId));
    },
    [setChainId]
  );

  /**
   * @dev Set chain id to redux state.
   * @notice Watch changes of chain id and update redux state.
   * @returns {void}
   */
  useEffect(() => {
    chainId && dispatch(setReduxChainId(chainId));
  }, [chainId, dispatch]);

  return (
    <MainContext.Provider
      value={{
        openNftDetailModal,
        selectChain,
        transitionLoading,
        fistLoading,
        defaultChains: DEFAULT_CHAINS,
        chainInfo: useMemo(
          () => DEFAULT_CHAINS.find((chain) => chain.chainId === chainId),
          [chainId]
        ),
        ...reduxState,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
