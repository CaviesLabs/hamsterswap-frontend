import { FC, useRef, useState } from "react";
import { RowNftItemProps } from "./types";
import { GameItemModal, NFTDetailsModal } from "../modal";
import { DetailIcon, VerticalDots } from "@/src/components/icons";
import { SwapItemType } from "@/src/entities/proposal.entity";
import useOnClickOutside from "@/src/hooks/useOnClickOutside";

export const RowNftItem: FC<RowNftItemProps> = (props) => {
  const { assetType } = props;

  const isSol = assetType === SwapItemType.CURRENCY;
  const isNft = assetType === SwapItemType.NFT;
  const isGameItem = assetType === SwapItemType.GAME;

  const [collapse, setCollapse] = useState(false);

  /**
   * @dev handle open modal by asset type
   */
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  /**
   * @dev reference to the button
   * close the dropdown when user click outside
   */
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setCollapse(false);
  });

  return (
    <>
      <div className="bg-white duration-500 flex rounded-[16px] p-[16px]">
        <div className="left pl-[2px]">
          <img
            src={props.image}
            alt="NFT image"
            className="h-full !w-[80px] object-cover rounded-[8px] aspect-square"
          />
        </div>
        <div className="px-4 w-72 left">
          <p className="text-lg semi-bold text-black truncate block capitalize">
            {props.name}
          </p>
          <div className="flex items-center">
            {!isSol && (
              <p className="text-[14px] regular-text text-purple cursor-auto mb-3">
                {props.collection}
              </p>
            )}
          </div>
        </div>
        {(isNft || isGameItem) && (
          <div className="ml-auto left mr-[20px] relative" ref={ref}>
            <button
              className="relative right-[-20px]"
              onClick={() => setCollapse(!collapse)}
            >
              <VerticalDots />
            </button>
            {collapse && (
              <div
                className="absolute right-[-20px] z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <li
                    className="cursor-pointer font-medium text-gray-900 block px-4 py-2 text-sm flex items-center"
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => setIsDetailOpen(true)}
                  >
                    <DetailIcon className="mr-1" />
                    View Detail
                  </li>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isNft ? (
        <NFTDetailsModal
          data={props}
          isModalOpen={isDetailOpen}
          handleCancel={() => setIsDetailOpen(false)}
          handleOk={() => setIsDetailOpen(false)}
        />
      ) : (
        isGameItem && (
          <GameItemModal
            data={props}
            isModalOpen={isDetailOpen}
            handleCancel={() => setIsDetailOpen(false)}
            handleOk={() => setIsDetailOpen(false)}
          />
        )
      )}
    </>
  );
};
