import { FC, useState } from "react";
import { RowNftEditItemProps } from "./types";
import { DeleteIcon, DetailIcon, VerticalDots } from "@/src/components/icons";
import { GameItemModal, NFTDetailsModal } from "@/src/components/modal";

export const RowEditNftItem: FC<RowNftEditItemProps> = (props) => {
  const { assetType } = props;
  const [collapse, setCollapse] = useState(false);
  /**
   * @dev handle open modal by asset type
   */
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <>
      <div className="md:left w-full mb-[20px]">
        <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex rounded-[16px] p-[16px]">
          <div className="left pl-[2px]">
            <img
              src={props.image}
              alt="NFT image"
              className="!h-full !w-[72px] !object-cover !rounded-[8px]"
            />
          </div>
          <div className="px-4 w-72 left">
            <p className="text-lg semi-bold text-black truncate block capitalize">
              {props.name}
            </p>
            <div className="flex items-center">
              <p className="text-[14px] regular-text text-purple cursor-auto mb-3">
                {props.collection}
              </p>
            </div>
          </div>
          <div className="ml-auto left mr-[20px] relative">
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
                  {(assetType === "nft" || assetType === "game") && (
                    <li
                      className="cursor-pointer regular-text hover:text-gray-400 text-gray-900 block px-4 py-2 text-sm flex items-center"
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => setIsDetailOpen(true)}
                    >
                      <DetailIcon className="mr-1" />
                      View Detail
                    </li>
                  )}
                  <li
                    className="cursor-pointer regular-text text-red300 hover:text-red-400 block px-4 py-2 text-sm flex items-center"
                    role="menuitem"
                    tabIndex={-1}
                    onClick={props.onDelete}
                  >
                    <DeleteIcon className="mr-1 fill-red300 group-hover:fill-red-400" />
                    Delete this item
                  </li>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {assetType === "nft" ? (
        <NFTDetailsModal
          isModalOpen={isDetailOpen}
          handleCancel={() => setIsDetailOpen(false)}
          handleOk={() => setIsDetailOpen(false)}
        />
      ) : (
        assetType === "game" && (
          <GameItemModal
            isModalOpen={isDetailOpen}
            handleCancel={() => setIsDetailOpen(false)}
            handleOk={() => setIsDetailOpen(false)}
          />
        )
      )}
    </>
  );
};