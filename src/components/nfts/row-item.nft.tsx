import { FC, useState } from "react";
import { RowNftItemProps } from "./types";
import { useMain } from "@/src/hooks/pages/main";
import { ConfirmedTransactionModal } from "../modal";

export const RowNftItem: FC<RowNftItemProps> = (props) => {
  const [collapse, setCollapse] = useState(false);
  const { openNftDetailModal } = useMain();
  const [openGameItemModal] = useState(false);

  return (
    <div className="md:left w-full cursor-pointer" onClick={openNftDetailModal}>
      <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex rounded-[16px] p-[16px]">
        <div className="left pl-[2px]">
          <img
            src={props.image}
            alt="NFT image"
            className="h-full !w-[72px] object-cover rounded-[8px]"
          ></img>
        </div>
        <div className="px-4 w-72 left">
          {/* <span className="text-gray-400 mr-3 uppercase text-xs">Nft Name</span> */}
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 13.5C6.5 12.6716 7.17157 12 8 12C8.82843 12 9.5 12.6716 9.5 13.5C9.5 14.3284 8.82843 15 8 15C7.17157 15 6.5 14.3284 6.5 13.5ZM6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8ZM8 1C7.17157 1 6.5 1.67157 6.5 2.5C6.5 3.32843 7.17157 4 8 4C8.82843 4 9.5 3.32843 9.5 2.5C9.5 1.67157 8.82843 1 8 1Z"
                fill="#7886A0"
              />
            </svg>
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
                  className="font-medium text-gray-900 block px-4 py-2 text-sm"
                  role="menuitem"
                  tabIndex={-1}
                >
                  <a>Details</a>
                </li>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmedTransactionModal
        isModalOpen={openGameItemModal}
        handleOk={() => {}}
        handleCancel={() => {}}
      />
    </div>
  );
};
