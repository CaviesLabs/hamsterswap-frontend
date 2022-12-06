import { FC, useEffect, useState } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProposalDetailPageProvider } from "@/src/hooks/pages/proposal-detail";
import { ProposalItem } from "@/src/components/proposal-item";
import { StyledProposalDetailPage } from "@/src/styled/proposal-detail-page.style";
import { LayoutSection } from "@/src/components/layout-section";
import { GuaranteedCard } from "@/src/components/guaranteed.card";
import { UserInfoCard } from "@/src/components/user-card";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button } from "@hamsterbox/ui-kit";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getProposal } from "@/src/redux/actions/proposal/proposal.action";
import {
  SwapOptionEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { DATE_TIME_FORMAT, parseProposal } from "@/src/utils";
import dayjs from "dayjs";

const Layout: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [proposal, setProposal] = useState<SwapProposalEntity>();

  useEffect(() => {
    if (!router.query.id) return;
    dispatch(
      getProposal({ id: router.query.id as string }, (data) =>
        setProposal(data)
      )
    );
  }, [router.query.id]);

  return (
    <MainLayout>
      <StyledProposalDetailPage>
        <div className="cover-container">
          <LayoutSection>
            <BreadCrumb data={["Home", "Advertiser"]} />
            <div className="mt-[20px] block md:flex">
              <p className="text-[32px]">Advertisement #675424</p>
              <GuaranteedCard className="md:ml-[12px]" />
            </div>
          </LayoutSection>
        </div>
        <LayoutSection className="relative top-[-180px]">
          <div className="mb-[20px]">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Advertiser
            </h3>
            <div className="block mt-[20px]">
              {proposal?.ownerId && <UserInfoCard userId={proposal.ownerId} />}
            </div>
          </div>
          <div className="mb-[20px]">
            <h3 className="mt-12 text-3xl font-bold tracking-tight text-gray-900">
              Active Swaps
            </h3>
            <div className="block mt-[20px]">
              <ProposalItem
                data={proposal}
                swapItems={
                  proposal?.offerItems.map((_) => parseProposal(_)) ?? []
                }
                receiveItems={
                  proposal?.swapOptions.map((swapOption: SwapOptionEntity) => {
                    return swapOption.items.map((_) => parseProposal(_));
                  }) ?? []
                }
                isGuaranteedPayment
              />
            </div>
          </div>
          <Row gutter={20} className="mb-[20px]">
            <Col span={12}>
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                Note
              </h3>
              <div className="block mt-[20px]">
                <p className="regular-text text-[16px]">{proposal?.note}</p>
                <p className="regular-text text-[14px] text-red300 mt-10">
                  Expiration date:{" "}
                  {dayjs(proposal?.expiredAt).format(DATE_TIME_FORMAT)}
                </p>
              </div>
            </Col>
            <Col span={12}>
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                Warranty
              </h3>
              <p className="mt-[12px] text-[16px] regular-text flex">
                Guaranteed payment amount:
                <img
                  src="/assets/images/solana-icon.svg"
                  alt="Solana Icon"
                  className="h-[24px] w-[24px] mx-[12px]"
                />
                <span className="semi-bold">300.00 SOL</span>
              </p>
            </Col>
          </Row>
          <Row justify="end">
            <Button
              text="Buy"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
            />
            <Button
              text="Order / Bid"
              shape="secondary"
              className="ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
            />
          </Row>
        </LayoutSection>
      </StyledProposalDetailPage>
    </MainLayout>
  );
};

const ProposalDetailPage: NextPage = () => {
  return (
    <ProposalDetailPageProvider>
      <Layout />
    </ProposalDetailPageProvider>
  );
};

export default ProposalDetailPage;
