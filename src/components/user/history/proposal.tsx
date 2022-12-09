import { Col, Row, Tag } from "antd";
import { ProposalHistoryProps } from "@/src/components/user/types";
import { DATE_TIME_FORMAT, utilsProvider } from "@/src/utils";
import { DotIcon } from "@/src/components/icons";
import dayjs from "dayjs";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { getStatus } from "@/src/utils/proposal-status";

function Proposal(props: ProposalHistoryProps) {
  const { data } = props;
  const status = data.status;

  const swapOption = data.swapOptions.find(
    (_) => _.id === data.fulfilledWithOptionId
  );

  return (
    <div className="border border-1 border-gray rounded-3xl p-6 mb-6">
      <Row className="pt-2">
        <Col span={5} className="text-lg">
          {dayjs(data.createdAt).format(DATE_TIME_FORMAT)}
        </Col>
        <Col span={6}>
          {data.offerItems.map((item, i) => (
            <div key={`swapItems-${i}`} className="flex items-center mb-3">
              <img
                className="w-10 rounded-lg"
                src={item.nftMetadata.nft_image}
              />
              <p className="ml-2 text-lg">{item.nftMetadata.nft_name}</p>
            </div>
          ))}

          <a href={"#"} className="text-md text-purple hover:underline">
            View Proposal
          </a>
        </Col>
        <Col span={6}>
          {swapOption?.items.map((item) => (
            <div key={item.id} className="flex items-center mb-3">
              <img
                className="w-10 rounded-lg"
                src={item.nftMetadata.nft_image}
              />
              <p className="ml-2 text-lg">{item.nftMetadata.nft_name}</p>
            </div>
          ))}
        </Col>
        <Col span={4} className="text-lg">
          {utilsProvider.makeShort(data.fulfillBy ?? " ", 4)}
        </Col>
        <Col span={3}>
          <Tag
            className="px-4 py-1 w-min flex items-center capitalize bg-[#EEFFDA] border-[#EEFFDA]"
            icon={<DotIcon className="mr-2" />}
            color={
              status === SwapProposalStatus.CANCELED
                ? "warning"
                : status === SwapProposalStatus.FULFILLED
                ? "success"
                : "error"
            }
          >
            <span className="text-[#353C4B]">{getStatus(status)}</span>
          </Tag>
        </Col>
      </Row>
    </div>
  );
}

export default Proposal;
