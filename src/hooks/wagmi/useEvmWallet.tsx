import { createContext, useContext, ReactNode, FC } from "react";
import { useWalletClient, useBalance, useAccount } from "wagmi";

/** @dev Initialize context. */
export const EvmWalletContext = createContext<{
  nativeBalance: string;
  walletAddress: string;
  signer: unknown;
}>(null);

/** @dev Expose wallet provider for usage. */
export const EvmWalletProvider: FC<{ children: ReactNode }> = (props) => {
  /** @notice Inject context of eth wallet. */
  const ethWallet = useAccount();
  const { data: walletClient } = useWalletClient();

  /** @notice Get chain native token balance. */
  const { data: nativeBalanceData } = useBalance({
    address: ethWallet?.address,
  });

  return (
    <EvmWalletContext.Provider
      value={{
        signer: walletClient,
        walletAddress: ethWallet?.address?.toString(),
        nativeBalance: parseFloat(nativeBalanceData?.formatted)?.toFixed(3),
      }}
    >
      {props.children}
    </EvmWalletContext.Provider>
  );
};

/** @dev Use context hook. */
export const useEvmWallet = () => {
  const context = useContext(EvmWalletContext);
  if (!context) {
    throw new Error("Must be in provider");
  }
  return context;
};
