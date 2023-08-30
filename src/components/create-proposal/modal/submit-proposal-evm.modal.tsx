import { FC, useState, useCallback, useEffect } from "react";
import { Modal } from "antd";
import { ModalProps } from "./types";
import { Button, toast } from "@hamsterbox/ui-kit";
import { useEvmToken } from "@/src/hooks/wagmi";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { useSubmitProposalEvm } from "@/src/hooks/pages/create-proposal/useSubmitProposalEvm";
import { useMain } from "@/src/hooks/pages/main";
import { UtilsProvider } from "@/src/utils";

export const ExecuteItem: FC<{
  name: string;
  image: string;
  amount: number;
  isLoading: boolean;
  isApprove: boolean;
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
 * @param {ModalProps} props The props of modal.
 * @returns {JSX.Element} The modal to confirm transaction.
 */
export const SubmitProposalEvmModal: FC<ModalProps> = (props) => {
  const { isLoading } = props;
  const { chainId, platformConfig } = useMain();
  const { offferedItems } = useCreateProposal();
  const { convertOfferedItemsHelper } = useSubmitProposalEvm();
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
      setTimeout(async () => {
        const isAllApproved = await Promise.all(
          convertOfferedItemsHelper().map((item) => {
            try {
              const isApproved = checkIsApproved(
                item.contractAddress,
                BigInt(item.amount),
                item?.itemType
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
    [convertOfferedItemsHelper]
  );

  /**
   * @dev The function to get executed items.
   * @returns {Array<JSX.Element>} The array of executed items.
   */
  const getExecutedItems = useCallback(
    () =>
      convertOfferedItemsHelper().map((item, index) => {
        const tokenInfo = offferedItems.find(
          (offItem) => offItem.id === item.id
        );

        return {
          name: tokenInfo?.name,
          image: tokenInfo?.image,
          isApprove: approvedList?.[index] || false,
          amount: offferedItems[index].tokenAmount
            ? parseInt(
                UtilsProvider.formatLongNumber(offferedItems[index].tokenAmount)
              )
            : 0,
          handleApprove: async () => {
            await approveToken(item.contractAddress, item.tokenId);
          },
        };
      }),
    [
      convertOfferedItemsHelper,
      platformConfig,
      offferedItems,
      chainId,
      approvedList,
    ]
  );

  useEffect(() => {
    handleCheckAllApproved(0);
  }, [props.isModalOpen]);

  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
      className="hamster-modal"
    >
      <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 font-bold text-gray-800 text-[25px] text-center">
          Confirm transaction
        </h2>
        <p className="mb-9 text-[18px] text-center">
          Confirm the transaction in your wallet to create proposal.
        </p>
        <div className="my-[40px]">
          {getExecutedItems().map((item) => (
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
        <Button
          type="button"
          disabled={!allApproved || processingLoading}
          theme={
            !allApproved && {
              color: "white",
              backgroundColor: "#94A3B8",
            }
          }
          onClick={props.handleOk}
          loading={processingLoading || isLoading}
          width={"100%"}
          text={
            isLoading ? "Confirming transaction in Wallet" : "Create Proposal"
          }
        />
      </div>
    </Modal>
  );
};
