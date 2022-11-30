import { FC, useState } from "react";
import { ProposalItemsProps } from "@/src/components/proposal-item/types";
import { Col, Row } from "antd";
import { Button } from "@hamsterbox/ui-kit";
import { RowNftItem } from "@/src/components/nfts";

const ProposalItems: FC<ProposalItemsProps> = (props) => {
  const { userAssets, userLookingFor } = props;

  /**
   * @dev Define value to display option.
   */
  const [optionSelected, setOptionSelected] = useState(0);

  return (
    <>
      <Row className="pt-[40px] md:px-10" gutter={20}>
        <Col span={12}>
          <div className="semi-bold text-[16px] h-[36px] leading-9">I Have</div>
        </Col>
        <Col span={12}>
          <div className="flex justify-between">
            <div className="semi-bold text-[16px] leading-9">Looking For</div>
            <div className="flex">
              {userLookingFor.map((_, index) => (
                <div className="ml-3" key={`ml3dix-${index}`}>
                  <Button
                    className="!rounded-[100px] after:!rounded-[100px] !px-[10px]"
                    size="small"
                    shape={optionSelected === index ? "primary" : "secondary"}
                    text={`Option ${index + 1}`}
                    onClick={() => setOptionSelected(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4 md:px-10" gutter={20}>
        <Col span={12}>
          {userAssets.map((item, index) => (
            <div className="mb-4" key={`proposal-item-${index}`}>
              <RowNftItem {...item} />
            </div>
          ))}
        </Col>
        <Col span={12}>
          {userLookingFor[optionSelected].map((item: any, index: number) => (
            <div className="mb-4" key={`swapoptions-${index}`}>
              <RowNftItem {...item} />
            </div>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default ProposalItems;
