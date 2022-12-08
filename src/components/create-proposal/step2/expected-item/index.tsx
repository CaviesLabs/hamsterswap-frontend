import { FC, useState } from "react";
import { Collapse } from "react-collapse";
import { RowEditNftItem } from "@/src/components/nfts";
import { Button } from "@hamsterbox/ui-kit";
import { PlusIcon } from "@/src/components/icons";
import {
  AddCashModal,
  AddGameItemModal,
  AddExpectedNftModal,
  AddSolModal,
} from "@/src/components/create-proposal";
import classnames from "classnames";
import { EmptyBox } from "@/src/components/create-proposal/empty-box";
import { ExpectedItemProps } from "@/src/components/create-proposal/step2/types";
import { useSelector } from "react-redux";
import { useCreateProposal } from "@/src/hooks/pages/create-proposal";

export const ExpectedItem: FC<ExpectedItemProps> = (props) => {
  const { expectedItems, removeExpectedItem } = useCreateProposal();

  const { optionName, defaultCollapsed } = props;
  /**
   * @dev Condition to collapse component.
   */
  const [collapse, setCollapse] = useState(defaultCollapsed);

  /**
   * @dev handle open modal by type
   */
  const [isAddNft, setIsAddNft] = useState(false);
  const [isAddSol, setIsAddSol] = useState(false);
  const [isAddGameItem, setIsAddGameItem] = useState(false);
  const [isAddCash, setIsAddCash] = useState(false);

  /**
   * Get expected items from redux-store to display
   */
  const proposal = useSelector((state: any) => state.proposal);

  /**
   * Handle save sol value into receiveItems array of redux-store
   * @param value [string]
   */
  const handleAddSol = (value: string) => {
    if (!value) return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;

    const newReceiveItems: any = proposal.receiveItems;
    const newChildReceiveItems: any = newReceiveItems[props.index];
    newChildReceiveItems.push({
      assetType: "token",
      name: `${value} SOL`,
      collection: "SOL",
      image: "/assets/images/solana-icon.svg",
      value,
    });
    newReceiveItems[props.index] = newChildReceiveItems;
    setIsAddSol(false);
  };

  /**
   * Handle save cash value into receiveItems array of redux-store
   * @param value [string]
   * @param method [string]
   */
  const handleAddCash = (value: string, method: string) => {
    if (!value) return;
    if (isNaN(parseFloat(value)) || parseFloat(value) <= 0) return;

    const newReceiveItems: any = proposal.receiveItems;
    const newChildReceiveItems: any = newReceiveItems[props.index];
    newChildReceiveItems.push({
      assetType: "usd",
      name: `${value} USD`,
      collection: method.toUpperCase(),
      image: "/assets/images/asset-cash.png",
      value,
    });
    newReceiveItems[props.index] = newChildReceiveItems;
    setIsAddCash(false);
  };

  return (
    <div
      className={classnames(
        "border-solid border-[2px] border-dark10 shadow-md rounded-t-[16px] mb-[20px]",
        {
          "border-0 shadow-[none]": !collapse,
        }
      )}
    >
      <div
        className={classnames("bg-dark10 px-6 py-[16px] rounded-t-[16px]", {
          "rounded-[16px]": !collapse,
        })}
      >
        <p
          className="cursor-pointer"
          onClick={() => setCollapse((prev) => !prev)}
        >
          {collapse ? "-" : "+"}
          <span className="ml-[12px]">{optionName}</span>
        </p>
      </div>
      <Collapse isOpened={collapse}>
        <div className="px-[20px]">
          <div className="flex items-center mt-[20px]">
            <Button
              text="Add NFT"
              className="!rounded-[100px] after:!rounded-[100px] float-right !px-4"
              icon={<PlusIcon />}
              onClick={() => setIsAddNft(true)}
              size="small"
            />
            <AddExpectedNftModal
              index={props.index}
              isModalOpen={isAddNft}
              handleOk={() => setIsAddNft(false)}
              handleCancel={() => setIsAddNft(false)}
            />
            <div className="ml-[12px]">
              <Button
                text="Add SOL"
                className="!rounded-[100px] after:!rounded-[100px] !px-4"
                theme={{
                  backgroundColor: "#41ADD1",
                  color: "#FFFFFF",
                }}
                icon={<PlusIcon />}
                onClick={() => setIsAddSol(true)}
                size="small"
              />
              <AddSolModal
                isModalOpen={isAddSol}
                handleOk={(value: string) => handleAddSol(value)}
                handleCancel={() => setIsAddSol(false)}
              />
            </div>
            <div className="ml-[12px]">
              <Button
                text="Add in-game item"
                className="!rounded-[100px] after:!rounded-[100px] !px-4"
                theme={{
                  backgroundColor: "#F47048",
                  color: "#FFFFFF",
                }}
                icon={<PlusIcon />}
                onClick={() => setIsAddGameItem(true)}
                size="small"
              />
              <AddGameItemModal
                isModalOpen={isAddGameItem}
                handleOk={() => setIsAddGameItem(false)}
                handleCancel={() => setIsAddGameItem(false)}
              />
            </div>
            <div className="ml-[12px]">
              <Button
                text="Add Cash"
                className="!rounded-[100px] after:!rounded-[100px] !px-4"
                theme={{
                  backgroundColor: "#97B544",
                  color: "#FFFFFF",
                }}
                icon={<PlusIcon />}
                onClick={() => setIsAddCash(true)}
                size="small"
              />
              <AddCashModal
                isModalOpen={isAddCash}
                handleOk={(value: string, method: string) =>
                  handleAddCash(value, method)
                }
                handleCancel={() => setIsAddCash(false)}
              />
            </div>
          </div>
          <div className="block">
            <div className="md:flex py-5 flex-wrap">
              {expectedItems[props.index]?.askingItems.map((item, index) => (
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
                      onDelete={() => {
                        removeExpectedItem(item.id);
                      }}
                    />
                  </div>
                </div>
              ))}
              <EmptyBox />
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
