import { Button, toast } from "@hamsterbox/ui-kit";
import { PlusIcon } from "@/src/components/icons";
import {
  AddCashModal,
  AddGameItemModal,
  AddNftModal,
  AddTokenModal,
} from "@/src/components/create-proposal";
import { RowEditNftItem } from "@/src/components/nfts";
import { FC, useEffect, useState } from "react";
import { EmptyBox } from "@/src/components/create-proposal/empty-box";
import { useDispatch } from "react-redux";
import { getListNft } from "@/src/redux/actions/nft/nft.action";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { AssetTypes, SwapItemType } from "@/src/entities/proposal.entity";
import { Col, Row } from "antd";
import { useAppWallet } from "@/src/hooks/useAppWallet";
import { useSelector } from "@/src/redux";

export const Step1: FC = () => {
  const { walletAddress } = useAppWallet();
  const { chainId } = useSelector();

  /** @dev Import functions in screen context. */
  const { offferedItems, removeOfferItem, addOfferItem } = useCreateProposal();

  /** @dev handle open modal by type */
  const [isAddNft, setIsAddNft] = useState(false);
  const [isAddSol, setIsAddSol] = useState(false);
  const [isAddGameItem, setIsAddGameItem] = useState(false);
  const [isAddCash, setIsAddCash] = useState(false);

  const dispatch = useDispatch();

  /**
   * @dev This effect will be excuted when walletAddress is changed.
   * @notice Fetch data from each chain.
   */
  useEffect(() => {
    if (!walletAddress) return;
    dispatch(
      getListNft({
        walletAddress,
        chainId,
      })
    );
  }, [chainId, walletAddress]);

  /**
   * Handle save sol value into swapItems array of redux-store
   * @param value [string]
   */
  const handleAddSol = (
    mintAddress: string,
    amount: string,
    decimal: number
  ) => {
    if (offferedItems.length === 4) {
      return toast.warn("Only a maximum of 4 items are allowed");
    }

    if (!amount) return;
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return;

    /**
     * @dev Excute adding data here.
     */
    addOfferItem(
      {
        nft_address: mintAddress,
        assetType: SwapItemType.CURRENCY,
        decimal,
      } as any,
      AssetTypes.token,
      parseFloat(amount)
    );

    setIsAddSol(false);
  };

  /**
   * Handle save cash value into swapItems array of redux-store
   * @param value [string]
   * @param method [string]
   */
  const handleAddCash = (value: string) => {
    if (offferedItems.length === 4) {
      return toast.warn("Only a maximum of 4 items are allowed");
    }

    if (!value) return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;

    addOfferItem(null, AssetTypes.token, parseFloat(value));
    setIsAddCash(false);
  };

  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Your items
      </h3>
      <p className="regular-text text-[16px] text-dark60">
        Max 4 items per swap. Choose an item below to add:
      </p>
      <div className="flex items-center mt-[20px]">
        <Button
          size="small"
          text="Add NFT"
          className="!rounded-[100px] after:!rounded-[100px] !px-4"
          icon={<PlusIcon />}
          onClick={() => setIsAddNft(true)}
        />
        <AddNftModal
          isModalOpen={isAddNft}
          handleOk={() => setIsAddNft(false)}
          handleCancel={() => setIsAddNft(false)}
        />
        <div className="ml-[12px]">
          <Button
            size="small"
            text="Add Token"
            className="!rounded-[100px] after:!rounded-[100px] !px-4"
            theme={{
              backgroundColor: "#41ADD1",
              color: "#FFFFFF",
            }}
            icon={<PlusIcon />}
            onClick={() => setIsAddSol(true)}
          />
          <AddTokenModal
            isModalOpen={isAddSol}
            handleCancel={() => setIsAddSol(false)}
            addInOwner={true}
            handleAddSol={(mintAddress, value, decimal) => {
              setIsAddSol(false);
              handleAddSol(mintAddress, value, decimal);
            }}
          />
        </div>
        <div className="ml-[12px]">
          <Button
            size="small"
            text="Add in-game item"
            className="!rounded-[100px] after:!rounded-[100px] !px-4"
            theme={{
              backgroundColor: "#F47048",
              color: "#FFFFFF",
            }}
            icon={<PlusIcon />}
            onClick={() => setIsAddGameItem(true)}
          />
          <AddGameItemModal
            isModalOpen={isAddGameItem}
            handleOk={() => setIsAddGameItem(false)}
            handleCancel={() => setIsAddGameItem(false)}
          />
        </div>
        <div className="ml-[12px]">
          <Button
            size="small"
            text="Add Cash"
            className="!rounded-[100px] after:!rounded-[100px] !px-4"
            theme={{
              backgroundColor: "#97B544",
              color: "#FFFFFF",
            }}
            icon={<PlusIcon />}
            onClick={() => setIsAddCash(true)}
          />
          <AddCashModal
            isModalOpen={isAddCash}
            handleOk={(value: string) => handleAddCash(value)}
            handleCancel={() => setIsAddCash(false)}
          />
        </div>
      </div>
      <div className="block mt-[20px]">
        <div className="pt-[40px] px-10">
          <Row gutter={[139, 20]}>
            {offferedItems.map((item, index) => (
              <Col
                span={12}
                className="block w-full md:pl-[20px]"
                key={Math.random().toString()}
              >
                <div className="flex">
                  <p className="text-[16px] text-gray-400 regular-text">
                    Item #{index + 1}
                  </p>
                </div>
                <div className="pt-[16px]">
                  <RowEditNftItem
                    {...item}
                    onDelete={() => {
                      removeOfferItem(item.id);
                    }}
                  />
                </div>
              </Col>
            ))}
            <EmptyBox existsAmount={offferedItems.length} />
          </Row>
        </div>
      </div>
    </div>
  );
};
