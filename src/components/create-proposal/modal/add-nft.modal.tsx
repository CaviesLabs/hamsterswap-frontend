import { FC, useEffect, useMemo } from "react";
import { Col, Modal, Row } from "antd";
import { AddItemModalProps } from "./types";
import SearchInput from "../../search";
import { useDispatch, useSelector } from "react-redux";
import { StyledModal } from "@/src/components/create-proposal/modal/add-nft.styled";
import { getListNft } from "@/src/redux/actions/nft/nft.action";
import { useConnectedWallet } from "@saberhq/use-solana";
import { setProposal } from "@/src/redux/actions/proposal/proposal.action";

const x: any = [
  {
    nft_name: "CyBall Chicken #124",
    nft_image_uri:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nft_symbol: "CyBall",
  },
  {
    nft_name: "CyBall Chicken #125",
    nft_image_uri:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nft_symbol: "CyBall",
  },
  {
    nft_name: "CyBall Chicken #126",
    nft_image_uri:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nft_symbol: "CyBall",
  },
  {
    nft_name: "CyBall Chicken #127",
    nft_image_uri:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nft_symbol: "CyBall",
  },
  {
    nft_name: "CyBall Chicken #128",
    nft_image_uri:
      "https://i.seadn.io/gae/mqP23OTG3rd4tCulkyTQcKpQyGfS2EYytpi8fPoJdD0HzGfzJ3DG4LJBl4uAcjEP7HalODFFNdMH-yVxaU8qkcLDsl0-imqNFf0Slw?auto=format&w=750",
    nft_symbol: "CyBall",
  },
];
export const AddNftModal: FC<AddItemModalProps> = (props) => {
  const dispatch = useDispatch();
  const wallet = useConnectedWallet();
  // const nfts = useSelector((state: any) => state.nft?.list_nfts);
  const nfts = x;
  const proposal = useSelector((state: any) => state.proposal);
  const swapItems = useSelector((state: any) => state.proposal?.swapItems);

  const nftsMemo = useMemo(() => {
    const data: any = [];
    nfts.forEach((i: any) => {
      const nftName = i?.nft_name ?? null;
      if (nftName) {
        const nft = swapItems.find((obj: any) => {
          return obj?.name === nftName;
        });
        if (!nft) {
          data.push(i);
        }
      }
    });
    return data;
  }, [proposal, swapItems]);

  useEffect(() => {
    if (!wallet) return;
    dispatch(
      getListNft({
        walletAddress: wallet.publicKey.toString(),
      })
    );
  }, [wallet]);

  const handleAddNft = (nftItem: any) => {
    const item = {
      assetType: "nft",
      name: nftItem.nft_name,
      image: nftItem.nft_image_uri,
      collection: nftItem.nft_symbol,
    };
    const swapItems = proposal.swapItems;
    swapItems.push(item);
    dispatch(
      setProposal({
        ...proposal,
        swapItems,
      })
    );
    if (swapItems.length >= 4) {
      props.handleOk(nftItem);
    }
  };

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
              {nftsMemo?.map((nftItem: any, i: number) => (
                <Row
                  className="bg-white rounded-lg p-4 w-full mb-4 cursor-pointer hover:bg-dark30"
                  key={`add-nft-item-pr-${i}`}
                  onClick={() => handleAddNft(nftItem)}
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
                      <span className="text-indigo-600">
                        {nftItem.nft_symbol}
                      </span>
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
