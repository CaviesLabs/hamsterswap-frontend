import { FC, useEffect, useState } from "react";
import { Modal } from "antd";
import { NftDetailsModalProps } from "./types";
import { Row, Col } from "antd";
import { NftService } from "@/src/services/nft.service";
import { AttributeDto } from "@/src/dto/nft.dto";
import { useMain } from "@/src/hooks/pages/main";

export const AttributeCard = (attr: AttributeDto) => (
  <div className="bg-gray-100 py-4 px-6 rounded-2xl	w-full">
    <p className="uppercase text-[12px]">{attr.trait_type}</p>
    <p className="font-bold text-gray-800 text-[16px] py-1">{attr.value}</p>
  </div>
);

export const NFTDetailsModal: FC<NftDetailsModalProps> = (props) => {
  const { data } = props;
  const { chainId } = useMain();
  const [attributes, setAttributes] = useState([]);

  /**
   * @dev Fetch nft detail when modal is open.
   * @notice This is a temporary solution, we will refactor this later.
   * @notice Get attributes from nft detail.
   */
  useEffect(() => {
    (async () => {
      if (!data?.address) return;
      const nft = await NftService.getService(chainId).getNftDetail({
        contractAddress: data.realAddress || data.address,
        chainId: chainId,
        tokenId: data.tokenId.toString(),
      });

      setAttributes(nft?.attributes);
    })();
  }, [data, chainId]);

  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={945}
      footer={null}
      className="hamster-modal"
    >
      <div className="py-6">
        <div className="max-w-[86rem] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4 mb-10 max-h-[460px]">
            <div className="md:basis-1/3 px-8">
              <div x-data="{ image: 1 }" x-cloak="true">
                <img
                  src={data?.image}
                  alt="nft image"
                  className="bg-dark10 rounded"
                />
              </div>
            </div>
            <div className="md:basis-2/3 px-8 overflow-auto">
              <div>NFT name</div>
              <h2 className="mb-6 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {data?.name}
              </h2>
              <p className="text-gray-500 text-sm">Collection</p>
              <div className="text-indigo-600">{data?.collectionName}</div>
              <p className="mt-6 mb-3 text-gray-500 text-sm">Attributes</p>
              <Row gutter={[16, 16]}>
                {attributes?.map((attr, index) => (
                  <Col span={12} key={`attr-item-${index}`}>
                    <AttributeCard {...attr} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
