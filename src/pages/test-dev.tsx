import type { NextPage } from "next";
import { useEffect } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { useConnectedWallet } from "@saberhq/use-solana";
import { getSwapProgramProvider } from "@/src/providers/swap-program";
import type { SignerWalletAdapter } from "@solana/wallet-adapter-base";

const TestPage: NextPage = () => {
  const { solanaWallet } = useWallet();
  const wallet = useConnectedWallet();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let swapProgramProvider;

  const handleCreateProposal = () => {
    const signer = solanaWallet.wallet.adapter as SignerWalletAdapter;
  };

  useEffect(() => {
    if (!wallet) return;
    swapProgramProvider = getSwapProgramProvider(wallet, {
      reInit: true,
    });
  }, [wallet]);

  return (
    <div>
      <h2>TestPage</h2>
    </div>
  );
};

export default TestPage;
