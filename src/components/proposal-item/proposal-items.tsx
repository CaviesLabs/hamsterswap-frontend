import { FC, useState } from "react";
import { ProposalItemsProps } from "@/src/components/proposal-item/types";
import { Col, Row } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import { RowNftItem } from "@/src/components/nfts";
import classnames from "classnames";

const ProposalItems: FC<ProposalItemsProps> = (props) => {
  const { userAssets, userLookingFor } = props;

  /**
   * @dev Define value to display option.
   */
  const [optionSelected, setOptionSelected] = useState(0);

  return (
    <>
      <Row className="pt-[40px]">
        <Col span={11}>
          <div className="semi-bold text-[16px] h-[36px] leading-9">I have</div>
        </Col>
        <Col offset={2} span={11}>
          <div className="flex justify-between">
            <div className="semi-bold text-[16px] leading-9">looking for</div>
            <div className="flex">
              {userLookingFor.length > 1 &&
                userLookingFor.map((_: any, index: number) => (
                  <div className="ml-3" key={`ml3dix-${index}`}>
                    <Button
                      className={classnames(
                        "!rounded-[100px] after:!rounded-[100px] !px-5",
                        optionSelected !== index &&
                          "!border !border-solid !border-dark60"
                      )}
                      size="small"
                      shape={optionSelected === index ? "primary" : "secondary"}
                      text={`Option ${index + 1}`}
                      theme={
                        optionSelected !== index && {
                          color: "#7886A0",
                          backgroundColor: "transparent",
                        }
                      }
                      onClick={() => setOptionSelected(index)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col span={11}>
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
        <Col offset={2} span={11}>
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
