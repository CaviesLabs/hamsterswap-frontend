import { FC, useState } from "react";
import { ProposalItemsProps } from "@/src/components/proposal-item/types";
import { Col, Row } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import { RowNftItem } from "@/src/components/nfts";
import { TwoWayArrowIcon } from "@/src/components/icons";
import { CheckIconProposal } from "@/src/components/icons";
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
            <div className="flex flex-wrap">
              {userLookingFor.length > 1 &&
                userLookingFor.map((_: any, index: number) => {
                  return (
                    <div className="ml-3 relative" key={`ml3dix-${index}`}>
                      <Button
                        className={classnames(
                          "!rounded-[100px] after:!rounded-[100px] !px-5 uppercase mx-[5px]",
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
                            hoverColor: "#798aaa",
                            backgroundColor: "transparent",
                          }
                        }
                        onClick={() => setOptionSelected(index)}
                      />
                      {fulfilledWithOptionId &&
                      fulfilledWithOptionId === _?.[0]?.optionId ? (
                        <CheckIconProposal className="absolute top-[10px] left-[12px] w-[15px] h-[15px]" />
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={10} sm={24}>
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
        <Col lg={4} xs={24} className="flex justify-center items-center">
          <TwoWayArrowIcon className="w-6" />
        </Col>
        <Col lg={10} sm={24}>
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
