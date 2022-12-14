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
    <div className="overflow-scroll h-52">
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-dark60">NFT Name</p>
          <p className="font-bold text-[16px]">{nft.nft_name}</p>
          <p className="mt-6 text-dark60">Collection</p>
          <p className="font-bold text-[16px] text-purple">
            {nft.nft_collection_name}
          </p>
        </div>

        <div className="w-28">
          <img className="aspect-square rounded-2xl" src={nft.nft_image} />
        </div>
      </div>
      <p className="mt-6 text-dark60">Attributes</p>
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
