import { FC } from "react";
import { Modal } from "antd";
import { NftDetailsModalProps } from "./types";

export const NFTDetailsModal: FC<NftDetailsModalProps> = (props) => {
  return (
    <Modal
      title="NFT Details"
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={800}
      footer={null}
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div x-data="{ image: 1 }" x-cloak>
                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img
                      src="https://i.seadn.io/gae/eWzj-NKrcU_4hRl3kezUR-gZTewLCOZyrK4nsyGzKEAg6zFjnSo-laT5rA3Q-OVwfvBrobWZe5EtVVFuPZYlK_SB9iUAWymCu4Ed?auto=format&w=1000"
                      alt="nft image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                Monomyth #6655
              </h2>
              <p className="text-gray-500 text-sm">
                Owned by{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  C4BD84
                </a>
              </p>

              <p className="text-gray-500 pt-[20px]">
                Monomyth is the universal story about the transformation of the
                hero inside all of us. “Be brave and fear not, embrace the
                challenge before you. Travel through the 7 worlds of Innerspace,
                to physically transform, learn and collect tokens of awareness.
                Your journey will expose you to the functions of consciousness
              </p>

              <div className="flex py-4 space-x-4">
                <button
                  type="button"
                  className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
