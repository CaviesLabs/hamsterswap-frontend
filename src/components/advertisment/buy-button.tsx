import { FC } from "react";
import { Button } from "@hamsterbox/ui-kit";
import { useCallback, useState } from "react";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useWalletKit } from "@gokiprotocol/walletkit";
import { useSelector } from "react-redux";
import { useWallet } from "@/src/hooks/useWallet";
import {
  ConfirmedTransactionModal,
  ConfirmTransactionModal,
  WalletEmptyModal,
} from "@/src/components/modal";

const BuyButton: FC<{ handleSwap(): Promise<void> }> = (props) => {
  /**
   * @dev Get user wallet
   */
  const wallet = useConnectedWallet();
  const { connect } = useWalletKit();
  const { programService, solanaWallet } = useWallet();

  const proposal = useSelector((state: any) => state.proposal);
  const seller = useSelector((state: any) => state.hPublicProfile);
  const buyer = useSelector((state: any) => state.hProfile);

  /**
   * States to handle display modal component
   */
  const [isTransFailed, setIsTransFailed] = useState(false);
  const [isDisplayConfirm, setIsDisplayConfirm] = useState(false);
  const [isDisplayConfirmed, setIsDisplayConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = useCallback(async () => {
    if (!proposal) return;
    if (!solanaWallet.publicKey) return connect();

    try {
      setIsLoading(true);
      await props.handleSwap();
      setIsDisplayConfirm(false);
      setIsDisplayConfirmed(true);
    } catch (err: any) {
      setIsTransFailed(true);
    } finally {
      setIsLoading(false);
    }
  }, [wallet, programService, solanaWallet, proposal]);

  return (
    <>
      <Button
        text="Buy"
        className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
        onClick={() => setIsDisplayConfirm(true)}
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
    </>
  );
};

export default BuyButton;
