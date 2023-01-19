import { FC, useState } from "react";
import { ProposalItemsProps } from "@/src/components/proposal-item/types";
import { Col, Row } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import { RowNftItem } from "@/src/components/nfts";
import { TwoWayArrowIcon } from "@/src/components/icons";
import { CheckIcon } from "@/src/components/icons";
import classnames from "classnames";

const ProposalItems: FC<ProposalItemsProps> = (props) => {
  const { userAssets, userLookingFor, fulfilledWithOptionId } = props;

  /**
   * @dev Define value to display option.
   */
  const [optionSelected, setOptionSelected] = useState(0);

  return (
    <>
      <Row className="pt-[40px]">
        <Col span={10}>
          <div className="semi-bold text-[16px] h-[36px] leading-9">I have</div>
        </Col>
        <Col offset={4} span={10}>
          <div className="flex justify-between">
            <div className="semi-bold text-[16px] leading-9">looking for</div>
            <div className="flex">
              {userLookingFor.length > 1 &&
                userLookingFor.map((_: any, index: number) => {
                  return (
                    <div className="ml-3 relative" key={`ml3dix-${index}`}>
                      <Button
                        className={classnames(
                          "!rounded-[100px] after:!rounded-[100px] !px-5",
                          optionSelected !== index &&
                            "!border !border-solid !border-dark60"
                        )}
                        size="small"
                        shape={
                          optionSelected === index ? "primary" : "secondary"
                        }
                        text={`Option ${index + 1}`}
                        theme={
                          optionSelected !== index && {
                            color: "#7886A0",
                            backgroundColor: "transparent",
                          }
                        }
                        onClick={() => setOptionSelected(index)}
                        icon
                      />
                      {fulfilledWithOptionId &&
                      fulfilledWithOptionId === _?.[0]?.optionId ? (
                        <CheckIcon
                          className="absolute top-[10px] left-[10px] w-[15px] h-[15px]"
                          color={
                            optionSelected === index ? "#ffffff" : "#735CF7"
                          }
                        />
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={10}>
          {userAssets.map((item, index) => (
            <div className="mb-4" key={`proposal-item-${index}`}>
              <RowNftItem
                {...item}
                collectionId={item.nftMetadata?.nft_collection_id}
                nftId={item.id}
                assetType={item.type}
              />
            </div>
          ))}
        </Col>
        <Col span={4} className="flex justify-center items-center">
          <div className="rounded-full bg-white p-[18px]">
            <TwoWayArrowIcon className="w-6" />
          </div>
        </Col>
        <Col span={10}>
          {userLookingFor[optionSelected]?.map((item: any, index: number) => (
            <div className="mb-4" key={`swapoptions-${index}`}>
              <RowNftItem
                {...item}
                collectionId={item.nftMetadata?.nft_collection_id}
                nftId={item.id}
                assetType={item.type as any}
              />
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ProposalItems;
