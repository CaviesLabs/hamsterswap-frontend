import { FC, useState } from "react";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { Button } from "@hamsterbox/ui-kit";
import { RedeemButtonProps } from "@/src/components/user/redeem-button/types";
import { useProgram } from "@/src/hooks/useProgram";

export const RedeemButton: FC<RedeemButtonProps> = (props) => {
  const { status, proposalId } = props;

  const [redeemed, setRedeemed] = useState<boolean>(
    status.valueOf() === SwapProposalStatus.FULFILLED.valueOf()
  );

  /**
   * @dev Import program service to use.
   */
  const { redeemProposal } = useProgram();

  return (
    redeemed && (
      <Button
        className="border-purple text-purple !border-2 px-10 rounded-3xl !h-full"
        onClick={async () => {
          await redeemProposal(proposalId);
          setRedeemed(false);
        }}
        size="large"
        text="Redeem"
      >
        Redeem
      </Button>
    )
  );
};
