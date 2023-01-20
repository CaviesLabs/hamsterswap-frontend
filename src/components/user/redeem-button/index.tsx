import { FC, useState, useCallback } from "react";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { Button, toast } from "@hamsterbox/ui-kit";
import { RedeemButtonProps } from "@/src/components/user/redeem-button/types";
import { useProgram } from "@/src/hooks/useProgram";
import { useProfilePage } from "@/src/hooks/pages/profile";
import { OptimizeTransactionModal } from "@/src/components/create-proposal/modal/optmize-transaction-modal";

export const RedeemButton: FC<RedeemButtonProps> = (props) => {
  const { status, proposalId, isOwner } = props;

  /**
   * @dev Import functions from hook
   */
  const { handleFilter } = useProfilePage();

  /**
   * @dev During redeeem submittion
   */
  const [isDuringSubmit, setIsDuringSubmit] = useState(false);

  /**
   * @dev Import program service to use.
   */
  const { redeemProposal } = useProgram();

  /**
   * @dev Condition to show popup to optimize proposal and submit proposal onchain.
   */
  const [optimizedProposalOpen, setOptimizedProposalOpen] = useState(false);

  /**
   * @dev The function to process to redeem proposal.
   */
  const handleRedeemProposal = useCallback(async () => {
    setIsDuringSubmit(true);
    setOptimizedProposalOpen(true);
    // try {
    //   setIsDuringSubmit(true);
    //   await redeemProposal(proposalId);
    //   toast.success("Redeem proposal was successfully!");
    // } catch (err: any) {
    //   toast.error(`Redeem proposal failed. ${err.message}`);
    // } finally {
    //   setIsDuringSubmit(false);
    //   handleFilter();
    // }
  }, [props.proposalId]);

  return (
    status.valueOf() === SwapProposalStatus.FULFILLED.valueOf() &&
    isOwner && (
      <>
        <Button
          className="border-purple text-purple !border-2 px-10 rounded-3xl !h-full"
          loading={isDuringSubmit}
          onClick={handleRedeemProposal}
          size="large"
          text="Redeem"
          shape="secondary"
        />
        <OptimizeTransactionModal
          isModalOpen={optimizedProposalOpen}
          instructionHandler={async () =>
            (await redeemProposal(proposalId)) as unknown as {
              proposalId?: string;
              fns: {
                optimize(): Promise<void>;
                confirm(): Promise<void>;
              };
            }
          }
          handleCancel={() => {
            setOptimizedProposalOpen(false);
            setIsDuringSubmit(false);
            handleFilter();
          }}
          handleOk={(proposalId) => {
            console.log(proposalId);
            setOptimizedProposalOpen(false);
            toast.success("Redeem proposal was successfully!");
            setIsDuringSubmit(false);
            handleFilter();
          }}
        />
      </>
    )
  );
};
