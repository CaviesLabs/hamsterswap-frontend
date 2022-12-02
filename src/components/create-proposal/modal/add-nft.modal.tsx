import { FC, useEffect } from "react";
import { Col, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { useDispatch, useSelector } from "react-redux";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { getListNft } from "@/src/redux/actions/nft/nft.action";
import { useConnectedWallet } from "@saberhq/use-solana";

export const AddNftModal: FC<AddItemModalProps> = (props) => {
  const dispatch = useDispatch();
  const wallet = useConnectedWallet();
  const nfts = useSelector((state: any) => state.nft?.list_nfts);

  useEffect(() => {
    if (!wallet) return;
    dispatch(
      getListNft({
        address: wallet.publicKey.toString(),
      })
    );
  }, [wallet]);

  return (
    <Modal
      title={<p className="text-2xl">Add NFT</p>}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={600}
      footer={null}
    >
      <StyledModal>
        <div className="pt-6">
          <div className="mx-auto items-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchInput
              className="rounded-3xl p-3"
              placeholder="Search for NFT, collection "
            />
            <div className="mt-10 max-h-96 overflow-scroll">
              {nfts?.map((nftItem: any, i: number) => (
                <Row
                  className="bg-white rounded-lg p-4 w-full mb-4 cursor-pointer hover:bg-dark30"
                  key={`add-nft-item-pr-${i}`}
                  onClick={() => props.handleOk(nftItem)}
                >
                  <Col span={5}>
                    <img
                      className="rounded bg-dark10"
                      src={nftItem.nft_image_uri}
                    />
                  </Col>
                  <Col span={18} className="pl-6">
                    <p className="font-bold text-lg">{nftItem.nft_name}</p>
                    <p className="text-lg">
                      <div className="text-indigo-600">
                        {nftItem.nft_symbol}
                      </div>
                    </p>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </div>
      </StyledModal>
    </Modal>
  );
};
