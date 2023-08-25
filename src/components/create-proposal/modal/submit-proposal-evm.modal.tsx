import { FC, useState, useCallback, useEffect } from "react";
import { Modal } from "antd";
import { ModalProps } from "./types";
import { Button, toast } from "@hamsterbox/ui-kit";
import { useEvmToken } from "@/src/hooks/wagmi";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { useSubmitProposalEvm } from "@/src/hooks/pages/create-proposal/useSubmitProposalEvm";
import { useMain } from "@/src/hooks/pages/main";

export const ExecuteItem: FC<{
  name: string;
  image: string;
  isApproved(): Promise<boolean>;
  handleApprove(): Promise<void>;
}> = (props) => {
  const [approved, setApproved] = useState(true);
  const [approveSuccess, setApproveSuccess] = useState(false);

  /**
   * @dev The function to handle approve token.
   * @notice This function will be called when user click approve button.
   * @notice Call handleApprove function from props.
   * @notice Disable approve button after user click.
   * @returns {void}
   */
  const handleApprove = useCallback(async () => {
    await props.handleApprove();
    setApproveSuccess(true);
  }, [props.handleApprove]);

  /**
   * @dev The function to check is approved.
   * @notice This function will be called when component mounted.
   * @notice Call isApproved function from props.
   * @returns {void}
   */
  useEffect(() => {
    (async function () {
      const isApproved = await props.isApproved();
      setApproved(isApproved);
    })();
  }, []);

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
          {props.name}
        </p>
      </div>
      {!approved && (
        <div className="float-right">
          <Button
            type="button"
            onClick={handleApprove}
            disabled={approveSuccess}
            width={"100%"}
            text={approveSuccess ? "Approved" : "Approve"}
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
  const { chainId } = useMain();
  const { offferedItems } = useCreateProposal();
  const { convertOfferedItemsHelper } = useSubmitProposalEvm();
  const { checkIsApproved, approveToken } = useEvmToken();
  const [processingLoading, setProcessingLoading] = useState(false);
  const [allApproved, setAllApproved] = useState(false);

  /**
   * @dev The function to handle check all approved.
   * @notice This function will be called when user click approve button.
   */
  const handleCheckAllApproved = useCallback(async () => {
    setProcessingLoading(true);
    setTimeout(async () => {
      const isAllApproved = await Promise.all(
        convertOfferedItemsHelper().map((item) => {
          console.log({ itemType: item?.itemType });
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

      setAllApproved(isAllApproved.every((item) => item));
      setProcessingLoading(false);
    }, 4000);
  }, [convertOfferedItemsHelper]);

  /**
   * @dev The function to get executed items.
   * @returns {Array<JSX.Element>} The array of executed items.
   */
  const getExecutedItems = useCallback(
    () =>
      convertOfferedItemsHelper().map((item) => {
        const tokenInfo = offferedItems.find(
          (offItem) => offItem.id === item.id
        );

        return {
          name: tokenInfo?.name,
          image: tokenInfo?.image,
          handleApprove: async () => {
            try {
              await approveToken(item.contractAddress, item.tokenId);
              handleCheckAllApproved();
            } catch (err) {
              toast.error("Approve token failed, please try again later.");
              console.error("ERROR_APPROVE_TOKEN", err);
            }
          },
          isApproved: async () =>
            await checkIsApproved(
              item.contractAddress,
              BigInt(item.amount),
              item.itemType
            ),
        };
      }),
    [convertOfferedItemsHelper, offferedItems, chainId]
  );

  useEffect(() => {
    handleCheckAllApproved();
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
              isApproved={item.isApproved}
              handleApprove={item.handleApprove}
              key={Math.random().toString()}
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
