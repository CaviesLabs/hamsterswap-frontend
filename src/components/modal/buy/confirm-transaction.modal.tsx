import { FC, useState, useCallback, useMemo } from "react";
import { Modal } from "antd";
import { ConfirmModalProps } from "./types";
import { Row, Col } from "antd";
import { utilsProvider } from "@/src/utils/utils.provider";
import { Button } from "@hamsterbox/ui-kit";
import { useMain } from "@/src/hooks/pages/main";
import { ChainId } from "@/src/entities/chain.entity";
import { RowNftItemProps } from "../../nfts";

export const NftItem: FC<
  RowNftItemProps & { isApproved?: boolean; handleApprove?(): void }
> = (props) => {
  /**
   * @notice Define state variables present user execute approve token or not.
   * @notice Default value is false.
   * @notice Use this state to disable approve button or not.
   */
  const [approved, setApproved] = useState(false);

  /**
   * @dev The function to handle approve token.
   * @notice This function will be called when user click approve button.
   * @notice Call handleApprove function from props.
   * @notice Disable approve button after user click.
   * @returns {void}
   */
  const handleApprove = useCallback(() => {
    props.handleApprove && props.handleApprove();
    setApproved(true);
  }, [props.handleApprove]);

  console.log(props);

  return (
    <div className="flow-root mb-[10px]">
      <div className="flex items-center float-left">
        <img
          src={props.image}
          alt="HamsterSwap"
          className="w-[36px] h-[36px] rounded-[8px] float-left"
        />
        <p className="float-left text-[#20242D] text-[16px] ml-[10px]">
          {props.name}
        </p>
      </div>
      {props?.isApproved === false && (
        <div className="float-right">
          <Button
            type="button"
            onClick={handleApprove}
            text="Approve"
            disabled={approved}
            width={"100%"}
            {...(approved && {
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
  const { isLoading, buyer, seller } = props;
  const { chainId } = useMain();

  /**
   * @dev The function to format nfts.
   * @notice If chain id is solana, return nfts.
   * @notice If chain id is not solana, return nfts with isApproved and handleApprove.
   * @returns {RowNftItemProps[]} The formatted nfts.
   */
  const formattedNfts = useMemo(
    () =>
      props.nfts.map((item) => {
        if (chainId === ChainId.solana) return item;
        return {
          ...item,
          isApproved: false,
          handleApprove: () => {
            console.log("Approve Token");
          },
        };
      }),
    [props.nfts, chainId]
  );

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
          <div className="mt-[20px]">
            {chainId !== ChainId.solana &&
              formattedNfts?.map((nft, index) => (
                <NftItem key={`pppsd${index}`} {...nft} />
              ))}
          </div>
          <Button
            type="button"
            onClick={props.handleOk}
            text={isLoading ? "Confirming transaction in Wallet" : "Confirm"}
            loading={isLoading}
            width={"100%"}
          />
        </div>
      </div>
    </Modal>
  );
};
