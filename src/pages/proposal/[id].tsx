import { FC } from "react";
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

const Layout: FC = () => {
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
              <UserInfoCard userId="sda" />
            </div>
          </div>
          <div className="mb-[20px]">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Active Swaps
            </h3>
            <div className="block mt-[20px]">
              <ProposalItem userInfoHidden={true} />
            </div>
          </div>
          <div className="mb-[20px]">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">
              Note
            </h3>
            <div className="block mt-[20px]">
              <p className="regular-text text-[16px]">
                Lorem ipsum dolor sit amet consectetur. Faucibus volutpat velit
                aliquam praesent donec habitant morbi id quis. Quis ut nunc
                nulla adipiscing duis.
              </p>
              <p className="regular-text text-[14px] text-red300 mt-[20px]">
                Expiration date: Nov, 2022 11:06
              </p>
            </div>
          </div>
          <div className="flow-root">
            <Button
              text="Order / Bid"
              shape="secondary"
              className="ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
            />
            <Button
              text="Buy"
              className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
            />
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
