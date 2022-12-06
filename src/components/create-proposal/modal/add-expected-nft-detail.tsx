import { FC } from "react";
import { Col, Row } from "antd";
import { AttributeCard } from "@/src/components/modal";
import { NftDetailDto } from "@/src/dto/nft.dto";

type DetailProps = {
  nft?: NftDetailDto;
};

export const AddExpectedNftDetail: FC<DetailProps> = (props) => {
  const { nft } = props;

  return (
    <div className="overflow-scroll h-96">
      <div className="mt-6 flex justify-between items-center">
        <div className="">
          <p className="text-dark60 text-lg">NFT Name</p>
          <p className="font-bold text-lg">{nft.nft_name}</p>
          <p className="mt-6 text-dark60 text-lg">Collection</p>
          <p className="font-bold text-lg text-purple">
            {nft.nft_collection_name}
          </p>
        </div>

        <div className="w-36 bg-dark30 rounded-2xl">
          <img className="aspect-square" src={nft.nft_image} />
        </div>
      </div>
      <p className="mt-6 text-dark60 text-lg">Attributes</p>
      <Row gutter={[16, 16]}>
        {nft.nft_attributes.attributes.map((attr, index) => (
          <Col span={12} key={`attr-item-${index}`}>
            <AttributeCard {...attr} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
