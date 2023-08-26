import { FC } from "react";
import { Col, Row } from "antd";
import { AttributeCard } from "@/src/components/modal";
import { NftEntity } from "@/src/dto/nft.dto";

type DetailProps = {
  nft?: NftEntity;
};

export const AddExpectedNftDetail: FC<DetailProps> = (props) => {
  const { nft } = props;

  return (
    <div className="overflow-scroll">
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-dark60">NFT Name</p>
          <p className="font-bold text-[16px]">{nft.name}</p>
          <p className="mt-6 text-dark60">Collection</p>
          <p className="font-bold text-[16px] text-purple">
            {nft.collectionName}
          </p>
        </div>
        <div className="w-28">
          <img className="aspect-square rounded-2xl" src={nft.image} />
        </div>
      </div>
      {nft?.attributes?.length && (
        <>
          <p className="mt-[20px] text-dark60">Attributes</p>
          <Row gutter={[16, 16]} className="mt-[10px]">
            {nft?.attributes?.map((attr, index) => (
              <Col span={12} key={`attr-item-${index}`}>
                <AttributeCard {...attr} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};
