import { useRouter } from "next/router";
import { Col, Row, Tag } from "antd";
import { ProposalHistoryProps } from "@/src/components/user/types";
import { DATE_TIME_FORMAT, solAmount, utilsProvider } from "@/src/utils";
import { DotIcon } from "@/src/components/icons";
import {
  SwapProposalStatus,
  SwapItemType,
} from "@/src/entities/proposal.entity";
import { getStatus } from "@/src/utils/proposal-status";
import { useMain } from "@/src/hooks/pages/main";
import UtilsProvider from "@/src/utils/utils.provider";
import moment from "moment";

function Proposal(props: ProposalHistoryProps) {
  const router = useRouter();
  const { data } = props;
  const { status, fulfillBy } = data;
  const {
    hPublicProfile,
    platformConfig: { allowCurrencies },
  } = useMain();

  /**
   * @description
   * validate user is buyer if wallet address match with fulfill user
   */
  const _isBuyer = fulfillBy === hPublicProfile.walletAddress;

  const renderSwapItemCol = () =>
    data.offerItems.map(
      ({ id, contractAddress, amount, nftMetadata, type }) => (
        <div key={`swapItems-${id}`} className="flex items-center mb-3">
          <img
            className="w-10 rounded-lg"
            src={
              nftMetadata?.nft_image ||
              nftMetadata?.icon ||
              allowCurrencies.find((item) => item.id === contractAddress)?.image
            }
          />
          <p className="ml-2">
            {type === SwapItemType.CURRENCY
              ? `${UtilsProvider.formatLongNumber(
                  solAmount(
                    amount,
                    allowCurrencies.find((item) => item.id === contractAddress)
                      ?.decimals
                  )
                )} ${
                  allowCurrencies.find((item) => item.id === contractAddress)
                    ?.name
                }`
              : nftMetadata?.nft_name ||
                (nftMetadata?.symbol &&
                  `${solAmount(amount, 9)} ${nftMetadata?.symbol}`)}
          </p>
        </div>
      )
    );

  const renderReceiveItemCol = () =>
    data.swapOptions
      .find((_) => _.id === data.fulfilledWithOptionId)
      ?.items.map(({ id, contractAddress, amount, nftMetadata, type }) => (
        <div key={id} className="flex items-center mb-3">
          <img
            className="w-10 rounded-lg"
            src={
              nftMetadata?.nft_image ||
              nftMetadata?.icon ||
              allowCurrencies.find((item) => item.id === contractAddress)?.image
            }
          />
          <p className="ml-2">
            {type === SwapItemType.CURRENCY
              ? `${UtilsProvider.formatLongNumber(
                  solAmount(
                    amount,
                    allowCurrencies.find((item) => item.id === contractAddress)
                      ?.decimals
                  )
                )} ${
                  allowCurrencies.find((item) => item.id === contractAddress)
                    ?.name
                }`
              : nftMetadata?.nft_name ||
                (nftMetadata?.symbol &&
                  `${solAmount(amount, 9)} ${nftMetadata?.symbol}`)}
          </p>
        </div>
      ));

  return (
    <div className="border border-1 border-gray rounded-3xl p-6 mb-6">
      <Row className="pt-2">
        <Col span={5} className="text-[16px] pt-2">
          {moment(data.createdAt).utc().format(DATE_TIME_FORMAT)}
        </Col>
        <Col span={6} className="text-[16px]">
          {_isBuyer ? renderReceiveItemCol() : renderSwapItemCol()}

          <a
            className="text-md text-purple hover:underline cursor-pointer"
            onClick={() => router.push(`/proposal/${props.data.id}`)}
          >
            View Proposal
          </a>
        </Col>
        <Col span={6} className="text-[16px]">
          {_isBuyer ? renderSwapItemCol() : renderReceiveItemCol()}
        </Col>
        <Col span={4} className="text-[16px] pt-2">
          <div
            className="text-[#735CF7] cursor-pointer"
            onClick={() => router.push(`/u/${data.ownerId}/profile`)}
          >
            {utilsProvider.makeShort(data.ownerAddress ?? " ", 4)}
          </div>
          <img className="w-6 my-2" src="/assets/images/arrow-two-way.svg" />
          <div
            className="text-[#735CF7] cursor-pointer"
            onClick={() => router.push(`/u/${data.fulfillByUserId}/profile`)}
          >
            {utilsProvider.makeShort(data.fulfillBy ?? " ", 4)}
          </div>
        </Col>
        <Col span={3}>
          <Tag
            className="px-4 py-1 w-[120px] flex justify-center items-center capitalize bg-[#EEFFDA] border-[#EEFFDA] rounded-lg"
            icon={<DotIcon className="mr-2" />}
            color={
              status === SwapProposalStatus.CANCELED
                ? "warning"
                : status === SwapProposalStatus.FULFILLED ||
                  status === SwapProposalStatus.REDEEMED
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
