import { FC, useEffect, useState, useCallback } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProposalDetailPageProvider } from "@/src/hooks/pages/proposal-detail";
import { ProposalItem } from "@/src/components/proposal-item";
import { StyledProposalDetailPage } from "@/src/styled/proposal-detail-page.style";
import { LayoutSection } from "@/src/components/layout-section";
import { GuaranteedCard } from "@/src/components/guaranteed.card";
import { UserInfoCard } from "@/src/components/user-card";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { Button, toast } from "@hamsterbox/ui-kit";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getProposal } from "@/src/redux/actions/proposal/proposal.action";
import {
  SwapOptionEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { DATE_TIME_FORMAT, parseProposal } from "@/src/utils";
import { useWallet } from "@/src/hooks/useWallet";
import { useConnectedWallet } from "@saberhq/use-solana";
import dayjs from "dayjs";

const Layout: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { programService, solanaWallet } = useWallet();
  /**
   * @dev Get user wallet
   */
  const wallet = useConnectedWallet();

  const [proposal, setProposal] = useState<SwapProposalEntity>();

  const handleSwap = useCallback(async () => {
    if (!proposal || !solanaWallet.publicKey) return;
    try {
      await programService.swapProposal(
        solanaWallet,
        proposal.id,
        proposal.swapOptions[0].id
      );
      toast.success("Wrap proposal successfully");
    } catch (err: any) {
      console.log("error", err);
      toast.error("Swap proposal failed!", err);
    }
  }, [wallet, programService, solanaWallet, proposal]);

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
            <div className="mt-4 block md:flex">
              <p className="text-[32px]">Advertisement #675424</p>
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
              swapItems={
                proposal?.offerItems.map((_) => parseProposal(_)) ?? []
              }
              receiveItems={
                proposal?.swapOptions.map((swapOption: SwapOptionEntity) => {
                  return swapOption.items.map((_) => parseProposal(_));
                }) ?? []
              }
            />
          </div>

          <div className="mt-14">
            <Row gutter={20} className="mb-[20px]">
              <Col span={12}>
                <div className="text-2xl semi-bold tracking-tight text-gray-900">
                  Note
                </div>
                <div className="block mt-2">
                  <p className="regular-text text-[16px]">{proposal?.note}</p>
                  <p className="regular-text text-[14px] text-red300 mt-10">
                    Expiration date:{" "}
                    {dayjs(proposal?.expiredAt).format(DATE_TIME_FORMAT)}
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div className="text-2xl semi-bold tracking-tight text-gray-900">
                  Warranty
                </div>
                <p className="mt-2 text-[16px] regular-text flex">
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
          </div>

          <div className="mt-12">
            <Row justify="end">
              {solanaWallet.publicKey &&
                solanaWallet.publicKey?.toBase58().toString() !==
                  proposal?.ownerAddress && (
                  <>
                    <Button
                      text="Buy"
                      className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
                      onClick={handleSwap}
                    />
                    <Button
                      text="Order / Bid"
                      shape="secondary"
                      className="!border-[1.5px] ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
                      onClick={handleSwap}
                    />
                  </>
                )}
            </Row>
          </div>
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
