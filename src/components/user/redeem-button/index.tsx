import { FC, useState, useCallback } from "react";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { Button, toast } from "@hamsterbox/ui-kit";
import { RedeemButtonProps } from "@/src/components/user/redeem-button/types";
import { useProgram } from "@/src/hooks/useProgram";
import { useProfilePage } from "@/src/hooks/pages/profile";

export const RedeemButton: FC<RedeemButtonProps> = (props) => {
  const { status, proposalId } = props;

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
   * @dev The function to process to redeem proposal.
   */
  const handleRedeemProposal = useCallback(async () => {
    try {
      setIsDuringSubmit(true);
      await redeemProposal(proposalId);
      toast.success("Redeem proposal was successfully!");
    } catch (err: any) {
      toast.error(`Redeem proposal failed. ${err.message}`);
    } finally {
      setIsDuringSubmit(false);
      handleFilter();
    }
  }, [props.proposalId]);

  return (
    status.valueOf() === SwapProposalStatus.FULFILLED.valueOf() && (
      <Button
        className="border-purple text-purple !border-2 px-10 rounded-3xl !h-full"
        loading={isDuringSubmit}
        onClick={handleRedeemProposal}
        size="large"
        text="Redeem"
        shape="secondary"
      />
    )
  );
};
