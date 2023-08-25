import { useEffect, useState, useCallback, useMemo } from "react";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import MainLayout from "@/src/layouts/main";
import { ProposalItem } from "@/src/components/proposal-item";
import { StyledProposalDetailPage } from "@/src/styled/proposal-detail-page.style";
import { LayoutSection } from "@/src/components/layout-section";
import { GuaranteedCard } from "@/src/components/guaranteed.card";
import { UserInfoCard } from "@/src/components/user-card";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { getProposal } from "@/src/redux/actions/proposal/proposal.action";
import {
  SwapItemType,
  SwapOptionEntity,
  SwapProposalStatus,
} from "@/src/entities/proposal.entity";
import { DATE_TIME_FORMAT, parseProposal } from "@/src/utils";
import { useAppWallet, useNativeToken } from "@/src/hooks/useAppWallet";
import { useProgram } from "@/src/hooks/useProgram";
import { useMain } from "@/src/hooks/pages/main";

const BuyButton = dynamic(import("@/src/components/advertisment/buy-button"), {
  ssr: false,
});

const ProposalDetailPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { swapProposal } = useProgram();
  const { nativeToken } = useNativeToken();
  const { platformConfig, proposal } = useMain();
  const { walletAddress } = useAppWallet();
  const [optionSelected, setOptionSelected] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  /**
   * @dev The function handle swap proposal.
   * @notice If proposal require user deposit native token to swap, then user need to approve first.
   * @notice If proposal require user recive native token after swap, then user need to approve first.
   * @returns {Promise<void>}
   */
  const handleSwap = useCallback(async () => {
    /**
     * @dev Find if proposal require user deposit native token to swap.
     * @notice If not, set nativeToken to null.
     */
    const nativeToken = proposal?.swapOptions[optionSelected].items
      .filter((item) => item.type === SwapItemType.CURRENCY)
      .find((item) =>
        platformConfig.allowCurrencies.find(
          // eslint-disable-next-line prettier/prettier
          (token) => token.realAddress === item.contractAddress && token.isNativeToken
        )
      );

    /**
     * @dev Find if user recive native token after swap, then unwrap it.
     * @notice If not, set recipientNativeToken to null.
     */
    const recipientNativeToken = proposal?.offerItems
      .filter((item) => item.type === SwapItemType.CURRENCY)
      .find((item) =>
        platformConfig.allowCurrencies.find(
          // eslint-disable-next-line prettier/prettier
          (token) => token.realAddress === item.contractAddress && token.isNativeToken
        )
      );

    return await swapProposal(
      proposal.id,
      proposal.swapOptions[optionSelected].id,
      nativeToken ? BigInt(nativeToken.amount) : null,
      recipientNativeToken ? BigInt(recipientNativeToken.amount) : null
    );
  }, [walletAddress, proposal, optionSelected, swapProposal]);

  const expiredText = useMemo(() => {
    if (!proposal?.expiredAt) return "";
    return moment(proposal?.expiredAt).utc().format(DATE_TIME_FORMAT);
  }, [proposal]);

  /**
   * @dev Get proposal detail by id.
   */
  useEffect(() => {
    if (!router.query.id) return;
    dispatch(getProposal({ id: router.query.id as string }));
  }, [router.query.id]);

  /**
   * @dev Watch changes in proposal and process state.
   */
  useEffect(() => {
    Date.now() > new Date(proposal?.expiredAt)?.getTime() && setIsExpired(true);
  }, [proposal]);

  return (
    <MainLayout>
      <StyledProposalDetailPage>
        <div className="cover-container">
          <LayoutSection>
            <BreadCrumb data={["Home", "Advertiser"]} />
            <div className="mt-4 block md:flex items-center">
              <p className="text-[32px]">Advertisement #{proposal?.numberId}</p>
              <GuaranteedCard className="md:ml-[12px]" />
            </div>

            <div className="mt-20 mb-[20px]">
              <h3 className="text-[24px] semi-bold font-bold tracking-tight text-gray-900">
                Advertiser
              </h3>
              <div className="block mt-[20px]">
                {proposal?.ownerId && (
                  <UserInfoCard userId={proposal.ownerId} />
                )}
              </div>
            </div>
          </LayoutSection>
        </div>
        <LayoutSection className="relative">
          <h3 className="mt-[60px] semi-bold text-2xl font-bold tracking-tight text-gray-900">
            Active Swaps
          </h3>
          <div className="block mt-[20px]">
            <ProposalItem
              data={proposal}
              changeOption={(value) => {
                setOptionSelected(value);
              }}
              swapItems={
                proposal?.offerItems.map((_) =>
                  parseProposal(_, platformConfig?.allowCurrencies)
                ) ?? []
              }
              receiveItems={
                proposal?.swapOptions.map((swapOption: SwapOptionEntity) => {
                  return {
                    ...swapOption,
                    items: swapOption.items.map((_) =>
                      parseProposal(_, platformConfig?.allowCurrencies)
                    ),
                  };
                }) ?? []
              }
            />
          </div>
          <div className="mt-14">
            <Row gutter={20} className="mb-[20px]">
              <Col span={10}>
                <div className="text-2xl semi-bold tracking-tight text-gray-900">
                  Note
                </div>
                <div className="block mt-2">
                  <p className="regular-text text-[16px] break-all">
                    {proposal?.note}
                  </p>
                  <p className="regular-text text-[14px] text-red300 mt-10">
                    {isExpired ? (
                      "Expired"
                    ) : (
                      <>Expiration date: {expiredText}</>
                    )}
                  </p>
                </div>
              </Col>
              <Col offset={4} span={10}>
                <div className="text-2xl semi-bold tracking-tight text-gray-900">
                  Warranty
                </div>
                <p className="mt-2 text-[16px] regular-text flex">
                  Guarantee deposit amount:
                  <img
                    src={nativeToken?.icon}
                    alt="Solana Icon"
                    className="h-[24px] w-[24px] mx-[12px]"
                  />
                  <span className="semi-bold">300.00 SOL</span>
                </p>
              </Col>
            </Row>
          </div>
          <div className="mt-12">
            <Row justify="end">
              {walletAddress !== proposal?.ownerAddress &&
                !isExpired &&
                proposal?.status !== SwapProposalStatus.FULFILLED &&
                proposal?.status !== SwapProposalStatus.SWAPPED &&
                proposal?.status !== SwapProposalStatus.REDEEMED && (
                  <BuyButton
                    handleSwap={handleSwap}
                    optionIndex={optionSelected}
                    swapItems={proposal?.swapOptions[optionSelected].items}
                  />
                )}
            </Row>
          </div>
        </LayoutSection>
      </StyledProposalDetailPage>
    </MainLayout>
  );
};

export default ProposalDetailPage;
