import { FC, useState } from "react";
import { RowNftItemProps } from "./types";
import { Button } from "@hamsterbox/ui-kit";
import { useMain } from "@/src/hooks/pages/main";
import { GameItemModal, WalletEmptyModal, ConfirmTransactionModal } from "../modal";

export const RowNftItem: FC<RowNftItemProps> = (props) => {
  const { openNftDetailModal } = useMain();
  const [ openGameItemModal, setOpenGameItemModal ] = useState(false)

  return (
    <div className="md:left w-full mb-[20px] cursor-pointer">
      <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 flex items-center rounded-[16px] p-[16px]">
        <div className="left pl-[2px]">
          <img
            src={props.image}
            alt="NFT image"
            className="h-full w-[72px] object-cover rounded-[8px]"
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
        <div className="ml-auto left mr-[20px]">
          <a href="#">
            <Button
              text="View details"
              size="small"
              onClick={() => setOpenGameItemModal(true)}
            />
          </a>
        </div>
      </div>
      {/*<GameItemModal*/}
      {/*  isModalOpen={openGameItemModal}*/}
      {/*  handleOk={() => {}}*/}
      {/*  handleCancel={() => {}}*/}
      {/*/>*/}
      {/*<WalletEmptyModal*/}
      {/*  isModalOpen={openGameItemModal}*/}
      {/*  handleOk={() => {}}*/}
      {/*  handleCancel={() => {}}*/}
      {/*/>*/}
      <ConfirmTransactionModal
        isModalOpen={openGameItemModal}
        handleOk={() => {}}
        handleCancel={() => {}}
      />
    </div>
  );
};
