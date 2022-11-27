import { FC } from "react";
import { Modal } from "antd";
import { NftDetailsModalProps } from "./types";
import { Row, Col } from "antd";

const mockAttributes = [
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
  {
    title: "Background",
    value: "Purple",
    percent: "10%",
    solAmount: 9.99,
  },
];

export const NFTDetailsModal: FC<NftDetailsModalProps> = (props) => {
  return (
    <Modal
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={945}
      footer={null}
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4 mb-10 max-h-[460px]">
            <div className="md:basis-1/3 px-8">
              <div x-data="{ image: 1 }" x-cloak>
                <img
                  src="https://i.seadn.io/gae/eWzj-NKrcU_4hRl3kezUR-gZTewLCOZyrK4nsyGzKEAg6zFjnSo-laT5rA3Q-OVwfvBrobWZe5EtVVFuPZYlK_SB9iUAWymCu4Ed?auto=format&w=1000"
                  alt="nft image"
                  className="rounded"
                />
              </div>
              <p className="text-xl mt-4 font-regular text-gray-500">
                Floor Price
              </p>
              <div className="flex items-center mt-2">
                <img src="/assets/images/solana.svg" />
                <p className="font-bold text-2xl ml-2">20.001 SOL</p>
              </div>
            </div>
            <div className="md:basis-2/3 px-8 overflow-auto">
              <div>NFT name</div>
              <h2 className="mb-6 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                Monomyth #6655
              </h2>
              <p className="text-gray-500 text-sm">Collection</p>
              <a href="#" className="text-indigo-600 hover:underline">
                Cyball
              </a>
              <p className="mt-6 mb-3 text-gray-500 text-sm">Attributes</p>
              <Row gutter={[16, 16]}>
                {mockAttributes.map((attr, index) => (
                  <Col span={12} key={`attr-item-${index}`}>
                    <div className="bg-gray-100 py-4 px-6 rounded-2xl	w-full">
                      <p className="uppercase">{attr.title}</p>
                      <p className="font-bold text-gray-800 text-xl py-3">
                        {attr.value}
                      </p>
                      <div className="flex flex-row justify-between">
                        <div className="bg-gray-300 rounded-3xl px-4 flex justify-center items-center">
                          {attr.percent}
                        </div>
                        <div className="flex">
                          <img src="/assets/images/solana.svg" />
                          <p className="font-bold text-lg ml-1">
                            {attr.solAmount}
                          </p>
                        </div>
                      </div>
                    </div>
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
