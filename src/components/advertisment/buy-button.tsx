import { FC, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, toast } from "@hamsterbox/ui-kit";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useWallet } from "@/src/hooks/useWallet";
import {
  ConfirmedTransactionModal,
  ConfirmTransactionModal,
  WalletEmptyModal,
} from "@/src/components/modal";
import { useMain } from "@/src/hooks/pages/main";
import { OptimizeTransactionModal } from "@/src/components/create-proposal/modal/optmize-transaction-modal";

const BuyButton: FC<{
  handleSwap(): Promise<void | {
    proposalId?: string;
    fns: { optimize(): Promise<void>; confirm(): Promise<void> };
  }>;
  optionIndex: number;
}> = (props) => {
  /**
   * @dev Get user wallet
   */
  const wallet = useConnectedWallet();
  const router = useRouter();
  const { connect } = useWalletKit();
  const { programService, solanaWallet } = useWallet();

  /**
   * @dev Import redux states.
   */
  const { proposal, hPublicProfile: seller, hProfile: buyer } = useMain();

  /**
   * States to handle display modal component
   */
  const [isTransFailed, setIsTransFailed] = useState(false);
  const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
  const [isDisplayConfirmed, setIsDisplayConfirmed] = useState(false);
  const [isBuyButtonLoading, setIsBuyButtonLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @dev Condition to show popup to optimize proposal and submit proposal onchain.
   */
  const [optimizedProposalOpen, setOptimizedProposalOpen] = useState(false);

  /**
   * @dev Condition whether user want to use with optimize option.
   */
  const isOptimized = useMemo(
    () => router?.query?.optimized === "true",
    [router]
  );

  const handleSwap = useCallback(async () => {
    if (!proposal) return;
    if (!solanaWallet.publicKey) return connect();

    /**
     * @dev Turn on loading status in buy button.
     */
    setIsLoading(true);
    setIsBuyButtonLoading(true);
    if (isOptimized) {
      /**
       * @dev Turn on optimized transaction modal if having optimized option.
       */
      setOptimizedProposalOpen(true);
    } else {
      try {
        /**
         * @dev Call function to process.
         */
        await props.handleSwap();

        /**
         * @dev Turn off confirm modal.
         */
        setIsDisplayConfirm(false);

        /**
         * @dev Show confirmed modal when swap successfully.
         */
        setIsDisplayConfirmed(true);
      } catch (err: any) {
        console.log(err.message);
        if (
          err?.message ===
          "WalletSignTransactionError: User rejected the request."
        ) {
          toast(`Buy proposal failed, user rejected the request.`);
        } else {
          setIsTransFailed(true);
        }
      } finally {
        setIsBuyButtonLoading(false);
        setIsLoading(false);
      }
    }
  }, [wallet, programService, solanaWallet, proposal, props.optionIndex]);

  return (
    <>
      <Button
        text={
          (proposal as any)?.swapOptions?.length > 1
            ? `Buy with option ${props.optionIndex + 1}`
            : "Buy"
        }
        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
        onClick={() => setIsDisplayConfirm(true)}
        loading={isBuyButtonLoading}
      />
      <Button
        text="Order / Bid"
        shape="secondary"
        className="!border-[1.5px] ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
        onClick={() => setIsDisplayConfirm(true)}
      />
      <ConfirmTransactionModal
        isLoading={isLoading}
        buyer={buyer}
        seller={seller}
        handleOk={() => handleSwap()}
        handleCancel={() => setIsDisplayConfirm(false)}
        isModalOpen={isDisplayConfirm}
      />
      <ConfirmedTransactionModal
        buyer={buyer}
        seller={seller}
        handleOk={() => setIsDisplayConfirmed(false)}
        handleCancel={() => setIsDisplayConfirmed(false)}
        isModalOpen={isDisplayConfirmed}
      />
      <WalletEmptyModal
        handleOk={() => setIsTransFailed(false)}
        handleCancel={() => setIsTransFailed(false)}
        isModalOpen={isTransFailed}
      />
      {isOptimized ? (
        <OptimizeTransactionModal
          isModalOpen={optimizedProposalOpen}
          instructionHandler={async () =>
            (await props.handleSwap()) as unknown as {
              proposalId?: string;
              fns: {
                optimize(): Promise<void>;
                confirm(): Promise<void>;
              };
            }
          }
          handleCancel={() => {
            setOptimizedProposalOpen(false);
            setIsBuyButtonLoading(false);
            setIsLoading(false);
          }}
          handleOk={(proposalId) => {
            console.log(proposalId);
            setOptimizedProposalOpen(false);
            setIsDisplayConfirm(false);
            setIsDisplayConfirmed(true);
            setIsBuyButtonLoading(false);
            setIsLoading(false);
          }}
        />
      ) : null}
    </>
  );
};

export default BuyButton;
