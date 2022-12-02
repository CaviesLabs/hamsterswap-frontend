import { FC, useState } from "react";
import { Collapse } from "react-collapse";
import { RowEditNftItem } from "@/src/components/nfts";
import { swapOptions } from "@/src/utils/constants";
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

export const ExpectedItem: FC<ExpectedItemProps> = (props) => {
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
          <div className="block mt-[20px]">
            <Button
              text="Add NFT"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[120px]"
              icon={<PlusIcon />}
              onClick={() => setIsAddNft(true)}
              size="small"
            />
            <AddExpectedNftModal
              isModalOpen={isAddNft}
              handleOk={() => setIsAddNft(false)}
              handleCancel={() => setIsAddNft(false)}
            />
            <Button
              text="Add SOL"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[120px] ml-[12px]"
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
              handleOk={() => setIsAddSol(false)}
              handleCancel={() => setIsAddSol(false)}
            />
            <Button
              text="Add in-game item"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[180px] ml-[12px]"
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
            <Button
              text="Add Cash"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[120px] ml-[12px]"
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
              handleOk={() => setIsAddCash(false)}
              handleCancel={() => setIsAddCash(false)}
            />
          </div>
          <div className="block">
            <div className="md:flex py-5 flex-wrap">
              {swapOptions.map((item: any, index: any) => (
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
      </Collapse>
    </div>
  );
};
