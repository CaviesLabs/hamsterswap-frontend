import { Button } from "@hamsterbox/ui-kit";
import { PlusIcon } from "@/src/components/icons";
import {
  AddCashModal,
  AddGameItemModal,
  AddNftModal,
  AddSolModal,
} from "@/src/components/create-proposal";
import { RowEditNftItem } from "@/src/components/nfts";
import { FC, useEffect, useState } from "react";
import { EmptyBox } from "@/src/components/create-proposal/empty-box";
import { useDispatch } from "react-redux";
import { getListNft } from "@/src/redux/actions/nft/nft.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";
import { OfferedItemEntity, AssetTypes } from "@/src/entities/proposal.entity";
import { WSOL_ADDRESS } from "@/src/utils/constants";

export const Step1: FC = () => {
  const wallet = useConnectedWallet();

  /**
   * @dev Import functions in screen context.
   */
  const { offferedItems, removeOfferItem, addOfferItem } = useCreateProposal();

  /**
   * @dev handle open modal by type
   */
  const [isAddNft, setIsAddNft] = useState(false);
  const [isAddSol, setIsAddSol] = useState(false);
  const [isAddGameItem, setIsAddGameItem] = useState(false);
  const [isAddCash, setIsAddCash] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!wallet) return;
    dispatch(
      getListNft({
        walletAddress: wallet.publicKey.toString(),
      })
    );
  }, [wallet]);

  /**
   * Handle save sol value into swapItems array of redux-store
   * @param value [string]
   */
  const handleAddSol = (value: string) => {
    if (!value) return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;
    addOfferItem(
      { nft_address: WSOL_ADDRESS } as any,
      AssetTypes.token,
      parseFloat(value)
    );
    setIsAddSol(false);
  };

  /**
   * Handle save cash value into swapItems array of redux-store
   * @param value [string]
   * @param method [string]
   */
  const handleAddCash = (value: string) => {
    if (!value) return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;

    // const newSwapItems: any = swapItems;
    // newSwapItems.push({
    //   assetType: "usd",
    //   name: `${value} USD`,
    //   collection: method.toUpperCase(),
    //   image: "/assets/images/asset-cash.png",
    //   value,
    // });
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
            text="Add SOL"
            className="!rounded-[100px] after:!rounded-[100px] !px-4"
            theme={{
              backgroundColor: "#41ADD1",
              color: "#FFFFFF",
            }}
            icon={<PlusIcon />}
            onClick={() => setIsAddSol(true)}
          />
          <AddSolModal
            isModalOpen={isAddSol}
            handleCancel={() => setIsAddSol(false)}
            addInOwner={true}
            handleAddSol={(value) => {
              setIsAddSol(false);
              handleAddSol(value);
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
        <div className="md:flex pt-[40px] flex-wrap">
          {offferedItems.map((item: OfferedItemEntity, index) => (
            <div
              className="block md:left w-full md:w-[50%] md:pl-[20px]"
              key={`swapoptions-${index}`}
            >
              <div className="flow-root items-center h-[50px]">
                <p
                  className="text-[16px] float-left text-gray-400 regular-text"
                  style={{ transform: "translateY(50%)" }}
                >
                  Item #{index + 1}
                </p>
              </div>
              <div className="pt-[20px]">
                <RowEditNftItem
                  collection={item.nft_symbol}
                  image={item.nft_image_uri}
                  name={item.nft_name}
                  collectionId={item.nft_collection_id}
                  nftId={item.id}
                  assetType={item.assetType}
                  nftAddress={item?.nft_address}
                  tokenAmount={item?.tokenAmount}
                  onDelete={() => {
                    removeOfferItem(item.id);
                  }}
                />
              </div>
            </div>
          ))}
          {offferedItems.length < 4 && <EmptyBox />}
        </div>
      </div>
    </div>
  );
};
