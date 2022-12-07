import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@/src/hooks/useWallet";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useDispatch } from "react-redux";
import { useMain } from "@/src/hooks/pages/main";
import { Button, toast } from "@hamsterbox/ui-kit";
import * as anchor from "@project-serum/anchor";
import {
  getPropsals,
  getExploreProposals,
} from "@/src/redux/actions/proposal/proposal.action";
import { SwapProgramService } from "@/src/services/swap-program.service";
import { PublicKey } from "@solana/web3.js";
import {
  SwapProposalEntity,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import MainLayout from "@/src/layouts/main";

const TestPage: NextPage = () => {
  const dispatch = useDispatch();
  const [exploreProposals, setExploreProposals] = useState<
    SwapProposalEntity[]
  >([]);
  const { solanaWallet, programService } = useWallet();
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
                  "JaqCceske4iqD1rQscV7zSQhREjnzVobhVGsYg7Vv1D"
                ),
                id: SwapProgramService.generateUID(),
                amount: new anchor.BN(1 * 10),
                itemType: { [SwapItemType.CURRENCY]: {} },
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
            itemType: { [SwapItemType.CURRENCY]: {} },
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
      handleGetExploreProposals();
    } catch (err: any) {
      console.error(err.message);
    }
  }, [wallet, programService, solanaWallet]);

  const handleCancelProposal = useCallback(
    async (propsalId: string) => {
      console.log(wallet, programService);
      if (!wallet && !programService && !solanaWallet.publicKey) return;
      try {
        /**
         * @dev Call function to cancel.
         */
        await programService.cancelProposal(solanaWallet, propsalId);
        toast.success("Cancel proposal successfully");
        /**
         * @dev Reload to get new proposals.
         */
        dispatch(
          getPropsals({ walletAddress: wallet.publicKey.toBase58().toString() })
        );
      } catch (err: any) {
        console.log("error", err);
        toast.error("Cancel proposal failed: ", err.message);
      }
    },
    [wallet, programService, solanaWallet]
  );

  const handleSwap = useCallback(
    async (proposalId: string, optionId: string) => {
      try {
        await programService.swapProposal(solanaWallet, proposalId, optionId);
        toast.success("Wrap proposal successfully");
      } catch (err: any) {
        console.log("error", err);
        toast.error("Swap proposal failed!", err);
      }
    },
    [wallet, programService, solanaWallet]
  );

  /**
   * @dev Get explore proposals.
   */
  const handleGetExploreProposals = () => {
    dispatch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getExploreProposals({ options: { limit: 50 } }, (proposals) => {
        setExploreProposals(proposals);
      })
    );
  };

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

  useEffect(() => {
    handleGetExploreProposals();
  }, []);

  return (
    <MainLayout>
      <div>
        <h2>TestPage</h2>
        <Button onClick={handleCreateProposal} text="Test create a proposal" />
        <div className="flex">
          <div className="float-left w-[50%]">
            <p>My proposal</p>
            {proposals?.map((item, key) => (
              <div key={`proposal-item-${key}`} className="py-[10px] px-[10px]">
                <div className="flex items-center">
                  <div className="float-left">ID: ${item.id.slice(0, 10)}</div>
                  <div className="float-left pl-[20px]">
                    <Button
                      onClick={() =>
                        handleCancelProposal(
                          "394ef0b2-f25b-4dcd-a576-4368d82fb1db"
                        )
                      }
                      size="small"
                      text="Cancel this proposal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="float-left w-[50%]">
            <p>Explore proposals</p>
            {exploreProposals?.map((item, key) => (
              <div
                key={`explore-proposal-item-${key}`}
                className="py-[10px] px-[10px]"
              >
                <div className="flex">
                  <div className="float-left">ID: ${item.id}</div>
                  <div className="float-left pl-[20px]">
                    <Button
                      onClick={() =>
                        handleSwap(item.id, item.swapOptions?.[0]?.id)
                      }
                      size="small"
                      text="Swap this proposal"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TestPage;
