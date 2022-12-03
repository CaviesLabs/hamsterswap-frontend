import type { NextPage } from "next";
import { useCallback } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { useConnectedWallet } from "@saberhq/use-solana";
import {
  // getSwapProgramProvider,
  SwapProgramProvider,
} from "@/src/providers/swap-program";
import { Button } from "@hamsterbox/ui-kit";
import * as anchor from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL, Keypair } from "@solana/web3.js";

const TestPage: NextPage = () => {
  const { solanaWallet, programService } = useWallet();
  const wallet = useConnectedWallet();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let swapProgramProvider: SwapProgramProvider;

  const handleCreateProposal = useCallback(() => {
    try {
      if (!wallet && !programService && !solanaWallet.publicKey) return;

      programService.createProposal(solanaWallet, {
        note: "Proposal #1",
        ownerAddress: wallet?.publicKey?.toString(),
        swapOptions: [
          {
            mintAccount: new PublicKey(
              "AaPymjMSALgb7ymPwND8C43mkMwTSoV8Jbxg3w2kkPg3"
            ),
            id: Keypair.generate().publicKey.toBase58().slice(0, 10),
            amount: new anchor.BN(LAMPORTS_PER_SOL * 1),
            itemType: { currency: {} },
          },
        ],
        offeredOptions: [
          {
            mintAccount: new PublicKey(
              "AaPymjMSALgb7ymPwND8C43mkMwTSoV8Jbxg3w2kkPg3"
            ),
            id: Keypair.generate().publicKey.toBase58().slice(0, 10),
            amount: new anchor.BN(LAMPORTS_PER_SOL * 1),
            itemType: { currency: {} },
          },
        ],
        expiredAt: new Date(),
      });
    } catch (err: any) {
      console.error(err.message);
    }
  }, [wallet, programService, solanaWallet]);

  return (
    <div>
      <h2>TestPage</h2>
      <Button onClick={handleCreateProposal} text="Test create a proposal" />
    </div>
  );
};

export default TestPage;
