import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useDispatch } from "react-redux";
import { useMain } from "@/src/hooks/pages/main";
import { Button, toast } from "@hamsterbox/ui-kit";
import * as anchor from "@project-serum/anchor";
import { getPropsals } from "@/src/redux/actions/proposal/proposal.action";
import { SwapProgramService } from "@/src/services/swap-program.service";
import { PublicKey } from "@solana/web3.js";

const TestPage: NextPage = () => {
  const { solanaWallet, programService } = useWallet();
  const dispatch = useDispatch();
  const { proposals } = useMain();

  /**
   * @dev Get user wallet
   */
  const wallet = useConnectedWallet();

  /**
   * @dev Handle to submit propoosal to server and on-chain.
   */
  const handleCreateProposal = useCallback(async () => {
    try {
      if (!wallet && !programService && !solanaWallet.publicKey) return;

      /**
       * @dev Initilize swap program item.
       */
      const createdData = {
        note: "Proposal #1",
        ownerAddress: wallet?.publicKey?.toString(),
        swapOptions: [
          {
            id: SwapProgramService.generateUID(),
            askingItems: [
              {
                mintAccount: new PublicKey(
                  "AaPymjMSALgb7ymPwND8C43mkMwTSoV8Jbxg3w2kkPg3"
                ),
                id: SwapProgramService.generateUID(),
                amount: new anchor.BN(1 * 10),
                itemType: { currency: {} },
              },
            ],
          },
        ],
        offeredOptions: [
          {
            mintAccount: new PublicKey(
              "AaPymjMSALgb7ymPwND8C43mkMwTSoV8Jbxg3w2kkPg3"
            ),
            id: SwapProgramService.generateUID(),
            amount: new anchor.BN(1 * 10),
            itemType: { currency: {} },
          },
        ],
        expiredAt: new Date(),
      };

      /**
       * @dev Call create service.
       */
      await programService.createProposal(solanaWallet, createdData);

      /**
       * @dev Reload to get new proposals.
       */
      dispatch(
        getPropsals({ walletAddress: wallet.publicKey.toBase58().toString() })
      );
    } catch (err: any) {
      console.error(err.message);
    }
  }, [wallet, programService, solanaWallet]);

  const handleCancelProposal = useCallback(
    async (propsalId: string) => {
      if (!wallet && !programService && !solanaWallet.publicKey) return;

      try {
        /**
         * @dev Call function to cancel.
         */
        await programService.cancelProposal(solanaWallet, propsalId);
        toast.success("Cancel proposal successfully");
      } catch (err: any) {
        console.log("error", err);
        toast.error("Cancel proposal failed: ", err.message);
      }
    },
    [wallet, programService, solanaWallet]
  );

  /**
   * @dev Get proposal owned by user.
   */
  useEffect(() => {
    if (!wallet) return;
    dispatch(
      getPropsals({ walletAddress: wallet.publicKey.toBase58().toString() })
    );
  }, [wallet]);

  useEffect(() => {
    console.log("Proposals", proposals);
  }, [proposals]);

  return (
    <div>
      <h2>TestPage</h2>
      <Button onClick={handleCreateProposal} text="Test create a proposal" />
      {proposals.map((item, key) => (
        <div key={`proposal-item-${key}`} className="py-[10px] px-[10px]">
          <div className="flex">
            <div className="float-left">ID: ${item.id}</div>
            <div className="float-left pl-[20px]">
              <Button
                onClick={() => handleCancelProposal(item.id)}
                text="Cancel this proposal"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestPage;
