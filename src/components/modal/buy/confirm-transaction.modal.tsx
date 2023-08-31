import { FC, useState, useCallback, useEffect } from "react";
import { Modal } from "antd";
import { ConfirmModalProps } from "./types";
import { Row, Col } from "antd";
import { utilsProvider } from "@/src/utils/utils.provider";
import { Button, toast } from "@hamsterbox/ui-kit";
import { ChainId } from "@/src/entities/chain.entity";
import { useEvmToken } from "@/src/hooks/wagmi";
import { SwapItemType } from "@/src/entities/proposal.entity";
import { useMain } from "@/src/hooks/pages/main";

export const ExecuteItem: FC<{
  name: string;
  image: string;
  isLoading: boolean;
  isApprove: boolean;
  amount: number;
  handleApprove(): Promise<void>;
  handleCheckApproveAll(delay: number): Promise<void>;
}> = (props) => {
  const [approveSuccess, setApproveSuccess] = useState(false);
  const [processingLoading, setProcessingLoading] = useState(false);

  /**
   * @dev The function to handle approve token.
   * @notice This function will be called when user click approve button.
   * @notice Call handleApprove function from props.
   * @notice Disable approve button after user click.
   * @returns {void}
   */
  const handleApprove = useCallback(async () => {
    try {
      setProcessingLoading(true);
      await props.handleApprove();
      setApproveSuccess(true);
      await props.handleCheckApproveAll(7000);
    } catch (err) {
      toast.error("Approve token failed, please try again later.");
      console.error("ERROR_APPROVE_TOKEN", err);
    } finally {
      setProcessingLoading(false);
    }
  }, [props.handleApprove]);

  return (
    <div className="flow-root mb-[10px]">
      <div className="flex items-center float-left">
        <img
          src={props.image}
          alt="Hamster
          \wap"
          className="w-[36px] h-[36px] rounded-[8px] float-left"
        />
        <p className="float-left text-[#20242D] text-[16px] ml-[10px]">
          {props.amount !== 0 && props.amount} {props.name}
        </p>
      </div>
      {!props.isApprove && !approveSuccess && (
        <div className="float-right">
          <Button
            type="button"
            onClick={handleApprove}
            disabled={approveSuccess || props.isLoading}
            loading={processingLoading || props.isLoading}
            width={"100%"}
            text={
              props.isLoading
                ? "Loading..."
                : processingLoading
                ? "Approving"
                : approveSuccess
                ? "Approved"
                : "Approve"
            }
            {...(approveSuccess && {
              theme: {
                backgroundColor: "#94A3B8",
                color: "#FFFFFF",
              },
            })}
          />
        </div>
      )}
    </div>
  );
};

/**
 * @dev This is the modal to confirm transaction.
 * @param {ConfirmModalProps} props The props of modal.
 * @returns {JSX.Element} The modal to confirm transaction.
 */
export const ConfirmTransactionModal: FC<ConfirmModalProps> = (props) => {
  const { isLoading, buyer, seller, swapItems } = props;
  const { chainId } = useMain();

  const { checkIsApproved, approveToken } = useEvmToken();
  const [processingLoading, setProcessingLoading] = useState(false);
  const [allApproved, setAllApproved] = useState(false);
  const [approvedList, setApprovedList] = useState<boolean[]>([]);

  /**
   * @dev The function to handle check all approved.
   * @notice This function will be called when user click approve button.
   */
  const handleCheckAllApproved = useCallback(
    async (delay = 0) => {
      setProcessingLoading(true);
      if (!swapItems) return setProcessingLoading(false);
      setTimeout(async () => {
        const isAllApproved = await Promise.all(
          swapItems?.map((item) => {
            try {
              const isApproved = checkIsApproved(
                item.contractAddress,
                BigInt(item.amount),
                item?.type === SwapItemType.NFT ? 0 : 1
              );
              return isApproved;
            } catch (err) {
              console.error("ERROR_CHECK_APPROVE", err);
              return false;
            }
          })
        );

        setApprovedList(isAllApproved);
        setAllApproved(isAllApproved.every((item) => item));
        setProcessingLoading(false);
      }, delay);
    },
    [swapItems, checkIsApproved]
  );

  /**
   * @dev The function to get executed items.
   * @returns {Array<JSX.Element>} The array of executed items.
   */
  const getExecutedItems = useCallback(() => {
    return swapItems?.map((item, index) => {
      return {
        name: item?.nftMetadata.metadata.name,
        image:
          item?.nftMetadata.metadata.image || item?.nftMetadata.metadata.icon,
        isApprove: approvedList?.[index] || false,
        amount:
          item?.type === SwapItemType.CURRENCY
            ? item?.amount / Math.pow(10, item?.nftMetadata?.metadata?.decimals)
            : 0,
        handleApprove: async () => {
          await approveToken(
            item.contractAddress,
            item?.nftMetadata?.metadata?.tokenId
          );
        },
        isApproved: async () =>
          await checkIsApproved(
            item.contractAddress,
            BigInt(item.amount),
            item?.type === SwapItemType.NFT ? 0 : 1
          ),
      };
    });
  }, [
    swapItems,
    chainId,
    approvedList,
    checkIsApproved,
    handleCheckAllApproved,
    approveToken,
  ]);

  useEffect(() => {
    if (chainId !== ChainId.solana) handleCheckAllApproved(0);
  }, [props.isModalOpen, chainId]);

  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      className="hamster-modal"
    >
      <div className="py-6">
        <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="w-11/12 mx-auto">
            <Row justify="space-between" align="middle">
              <Col span={8} className="flex flex-col items-center">
                <img
                  src={seller?.avatar}
                  alt="Seller avatar"
                  className="rounded-[50%] max-w-[80px]"
                />
                <div className="font-bold text-center text-xl">
                  {utilsProvider.makeShort(seller?.walletAddress, 4)}
                </div>
              </Col>
              <Col span={8}>
                <img
                  src="/assets/images/arrow-two-way.svg"
                  alt="arrow-two-way"
                  className="mx-auto mt-6"
                />
              </Col>
              <Col span={8} className="flex flex-col items-center">
                <img
                  src={buyer?.avatar}
                  alt="onchain, but there isn't item in wallet"
                  className="rounded-[50%] max-w-[80px]"
                />
                <div className="font-bold text-center text-xl">You</div>
              </Col>
            </Row>
          </div>
          <h2 className="mt-10 mb-2 font-bold text-gray-800 text-2xl text-center">
            Confirm transaction
          </h2>
          <p className="mb-9 text-lg text-center">
            Confirm the transaction in your wallet to swap item(s) with{" "}
            <strong>{utilsProvider.makeShort(seller?.walletAddress, 4)}</strong>
            .
          </p>
          {chainId !== ChainId.solana && (
            <div className="mt-[20px]">
              {getExecutedItems()?.map((item) => (
                <ExecuteItem
                  name={item.name}
                  image={item.image}
                  isApprove={item.isApprove}
                  amount={item.amount}
                  handleApprove={item.handleApprove}
                  key={Math.random().toString()}
                  handleCheckApproveAll={handleCheckAllApproved}
                  isLoading={processingLoading}
                />
              ))}
            </div>
          )}
          <Button
            type="button"
            onClick={props.handleOk}
            text={isLoading ? "Confirming transaction in Wallet" : "Confirm"}
            loading={isLoading || processingLoading}
            width={"100%"}
            theme={
              (processingLoading ||
                (chainId !== ChainId.solana && !allApproved)) && {
                color: "white",
                backgroundColor: "#94A3B8",
              }
            }
            disabled={
              processingLoading || (chainId !== ChainId.solana && !allApproved)
            }
          />
        </div>
      </div>
    </Modal>
  );
};
