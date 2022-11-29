import { Button } from "@hamsterbox/ui-kit";
import { PlustIcon } from "@/src/components/icons";
import {
  AddCashModal,
  AddGameItemModal,
  AddNftModal,
  AddSolModal,
} from "@/src/components/modal";
import { swapOptions } from "@/src/utils";
import { RowEditNftItem } from "@/src/components/nfts";
import { FC, useState } from "react";

export const Step1: FC = () => {
  /**
   * @dev handle open modal by type
   */
  const [isAddNft, setIsAddNft] = useState(false);
  const [isAddSol, setIsAddSol] = useState(false);
  const [isAddGameItem, setIsAddGameItem] = useState(false);
  const [isAddCash, setIsAddCash] = useState(false);

  return (
    <div>
      <h3 className="text-3xl font-bold tracking-tight text-gray-900">
        Advertiser
      </h3>
      <p className="regular-text text-[16px] text-dark60">
        Max 4 items per swap. Choose an item below to add:
      </p>
      <div className="block mt-[20px]">
        <Button
          text="Add NFT"
          className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
          icon={<PlustIcon />}
          onClick={() => setIsAddNft(true)}
        />
        <AddNftModal
          isModalOpen={isAddNft}
          handleOk={() => setIsAddNft(false)}
          handleCancel={() => setIsAddNft(false)}
        />
        <Button
          text="Add SOL"
          className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
          theme={{
            backgroundColor: "#41ADD1",
            color: "#FFFFFF",
          }}
          icon={<PlustIcon />}
          onClick={() => setIsAddSol(true)}
        />
        <AddSolModal
          isModalOpen={isAddSol}
          handleOk={() => setIsAddSol(false)}
          handleCancel={() => setIsAddSol(false)}
        />
        <Button
          text="Add in-game item"
          className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[250px] ml-[12px]"
          theme={{
            backgroundColor: "#F47048",
            color: "#FFFFFF",
          }}
          icon={<PlustIcon />}
          onClick={() => setIsAddGameItem(true)}
        />
        <AddGameItemModal
          isModalOpen={isAddGameItem}
          handleOk={() => setIsAddGameItem(false)}
          handleCancel={() => setIsAddGameItem(false)}
        />
        <Button
          text="Add Cash"
          className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px] ml-[12px]"
          theme={{
            backgroundColor: "#97B544",
            color: "#FFFFFF",
          }}
          icon={<PlustIcon />}
          onClick={() => setIsAddCash(true)}
        />
        <AddCashModal
          isModalOpen={isAddCash}
          handleOk={() => setIsAddCash(false)}
          handleCancel={() => setIsAddCash(false)}
        />
      </div>
      <div className="block mt-[20px]">
        <div className="md:flex pt-[40px] flex-wrap">
          {swapOptions.map((item, index) => (
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
                <RowEditNftItem {...item} onDelete={() => {}} />
              </div>
            </div>
          ))}
          <EmptyBox />
        </div>
      </div>
    </div>
  );
};

function EmptyBox() {
  const existItems = swapOptions.length;

  return (
    <>
      {Array.from(Array(4 - existItems)).map((_, i) => {
        return (
          <div
            className="block md:left w-full md:w-[50%] md:pl-[20px]"
            key={`swapoptions-empty-${i}`}
          >
            <div className="flow-root items-center h-[50px]">
              <p
                className="text-[16px] float-left text-gray-400 regular-text"
                style={{ transform: "translateY(50%)" }}
              >
                Item #{existItems + 1}
              </p>
            </div>
            <div className="pt-[20px]">
              <div className="bg-dark10 border border-dashed border-1 border-[#94A3B8] rounded-2xl h-[103px]"></div>
            </div>
          </div>
        );
      })}
    </>
  );
}
