import { FC, useState, useCallback } from "react";
import { Button as _Button, toast } from "@hamsterbox/ui-kit";
import {
  ConfirmedTransactionModal,
  ConfirmTransactionModal,
  WalletEmptyModal,
} from "@/src/components/modal";
import { OptimizeTransactionModal } from "@/src/components/create-proposal/modal/optimize-transaction-modal";
import { useAppWallet, useConnect } from "@/src/hooks/useAppWallet";
import { SwapItemEntity } from "@/src/entities/proposal.entity";
import { ChainId } from "@/src/entities/chain.entity";
import { useMain } from "@/src/hooks/pages/main";
import { getProposalService } from "@/src/services/proposal.service";

const Button = _Button as any;
const BuyButton: FC<{
  handleSwap(): Promise<
    | any
    | {
        proposalId?: string;
        fnc: { optimize(): Promise<void>; confirm(): Promise<void> };
      }
  >;
  swapItems: SwapItemEntity[];
  optionIndex: number;
}> = (props) => {
  /**
   * @dev Get user wallet
   */
  const { walletAddress } = useAppWallet();
  const { connect } = useConnect();

  /**
   * @dev Import redux states.
   */
  const {
    proposal,
    hPublicProfile: seller,
    hProfile: buyer,
    chainId,
  } = useMain();

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

  const handleSwap = useCallback(async () => {
    console.log(walletAddress, proposal, props.optionIndex);
    if (!proposal) return;

    /**
     * @dev Turn on loading status in buy button.
     */
    setIsLoading(true);
    setIsBuyButtonLoading(true);
    setIsDisplayConfirm(false);

    if (chainId === ChainId.solana) {
      setOptimizedProposalOpen(true);
    } else {
      try {
        await props.handleSwap();
        setTimeout(() => {
          getProposalService().syncProposal(proposal.id);
        }, 2000);
        setIsDisplayConfirmed(true);
      } catch (err) {
        toast.error(
          "“Please ensure that your wallet is equipped with the necessary items."
        );
        console.error("ERROR_SWAP_PROPOSAL", err);
      } finally {
        setIsDisplayConfirm(false);
        setIsBuyButtonLoading(false);
        setIsLoading(false);
      }
    }
  }, [walletAddress, proposal, props.optionIndex, chainId]);

  return (
    <>
      <Button
        text={
          (proposal as any)?.swapOptions?.length > 1
            ? `Buy with option ${props.optionIndex + 1}`
            : "Buy"
        }
        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
        size="large"
        onClick={() => (!walletAddress ? connect() : setIsDisplayConfirm(true))}
        loading={isBuyButtonLoading}
      />
      {/* <Button
        text="Order / Bid"
        shape="secondary"
        className="!border-[1.5px] ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
        size="large"
        onClick={() => (!walletAddress ? connect() : setIsDisplayConfirm(true))}
      /> */}
      <ConfirmTransactionModal
        isLoading={isLoading}
        buyer={buyer}
        seller={seller}
        handleOk={() => handleSwap()}
        handleCancel={() => setIsDisplayConfirm(false)}
        isModalOpen={isDisplayConfirm}
        swapItems={props.swapItems}
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
      <OptimizeTransactionModal
        isModalOpen={optimizedProposalOpen}
        instructionHandler={async () =>
          (await props.handleSwap()) as unknown as {
            proposalId?: string;
            fnc: {
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
    </>
  );
};

export default BuyButton;
