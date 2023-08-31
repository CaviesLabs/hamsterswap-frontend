import classnames from "classnames";
import React, { FC, useRef, useState } from "react";
import { RowNftEditItemProps } from "./types";
import { DeleteIcon, DetailIcon, VerticalDots } from "@/src/components/icons";
import { NFTDetailsModal } from "@/src/components/modal";
import { SwapItemType } from "@/src/entities/proposal.entity";
import useOnClickOutside from "@/src/hooks/useOnClickOutside";
import { UtilsProvider } from "@/src/utils";
import { useMain } from "@/src/hooks/pages/main";

export const RowEditNftItem: FC<RowNftEditItemProps> = (props) => {
  /**
   * @dev reference to the button
   * close the dropdown when user click outside
   */
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setCollapse(false);
  });

  const { platformConfig } = useMain();
  const { assetType } = props;

  const [collapse, setCollapse] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleShowViewDetail = () => {
    setCollapse(!collapse);
    setIsDetailOpen(true);
  };

  const handleDelete = () => {
    setCollapse(!collapse);
    props.onDelete();
  };

  return (
    <>
      <div className="md:left w-full mb-[20px]">
        <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex rounded-[16px] p-[16px]">
          <div className="left pl-[2px]">
            <img
              src={
                assetType === SwapItemType.CURRENCY
                  ? platformConfig?.allowCurrencies?.find(
                      (item) => item.address === props.address
                    )?.icon
                  : props.image
              }
              alt="NFT image"
              className={classnames(
                "h-auto !w-[80px] !object-cover !rounded-[8px]",
                (assetType === SwapItemType.NFT ||
                  assetType === SwapItemType.GAME) &&
                  "bg-dark10"
              )}
            />
          </div>
          <div className="px-4 w-72 left">
            <p className="semi-bold text-black truncate block capitalize">
              {assetType === SwapItemType.CURRENCY
                ? `${UtilsProvider.formatLongNumber(props.tokenAmount)} ${
                    platformConfig?.allowCurrencies?.find(
                      (item) => item.address === props.address
                    )?.name
                  }`
                : props.name}
            </p>
            <div className="flex items-center">
              <p className="text-[14px] regular-text text-purple cursor-auto mb-3">
                {assetType !== SwapItemType.CURRENCY && props.collectionName}
              </p>
            </div>
          </div>
          <div className="ml-auto left mr-[20px] relative" ref={ref}>
            <button
              className="relative right-[-20px]"
              onClick={() => setCollapse(!collapse)}
            >
              <VerticalDots />
            </button>
            {collapse && (
              <div
                className="absolute right-[-20px] z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  {(assetType === SwapItemType.NFT ||
                    assetType === SwapItemType.GAME) && (
                    <div
                      className="cursor-pointer regular-text hover:text-gray-400 text-gray-900 block px-4 py-2 text-sm flex items-center"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={handleShowViewDetail}
                    >
                      <DetailIcon className="mr-1" />
                      View Detail
                    </div>
                  )}
                  <div
                    className="cursor-pointer regular-text text-red300 hover:text-red-400 block px-4 py-2 text-sm flex items-center"
                    role="menuitem"
                    tabIndex={-1}
                    onClick={handleDelete}
                  >
                    <DeleteIcon className="mr-1 fill-red300 group-hover:fill-red-400" />
                    Delete this item
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {assetType === SwapItemType.NFT && (
        <NFTDetailsModal
          address={props?.realAddress}
          tokenId={props?.tokenId}
          isModalOpen={isDetailOpen}
          handleCancel={() => setIsDetailOpen(false)}
          handleOk={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
};
