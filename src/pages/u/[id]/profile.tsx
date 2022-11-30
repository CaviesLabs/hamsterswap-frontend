import { FC, useState } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { ProposalExploreItem } from "@/src/components/proposal-item";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import { sortOptions } from "@/src/utils";
import { Button } from "@hamsterbox/ui-kit";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import Select from "@/src/components/select";
import Search from "@/src/components/search";

const Layout: FC = () => {
  /** @dev Storage sort value, default is @var {sortOptions[0]} */
  const [, setSortValue] = useState(sortOptions[0].value);

  return (
    <MainLayout>
      <Breadcrumb title="Profile" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            <UserInfoCard userId="sda" />
          </div>
        </div>
        <SubMenu curTab={0} />
        <div className="mb-[20px] mt-[50px]">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Proposal
          </h3>
          <div className="block py-[50px]">
            <div className="md:flex items-center">
              <p>Sort by</p>
              <Select
                placeholder="All status"
                options={sortOptions.map((_) => ({
                  value: _.value,
                }))}
                className="w-44 ml-6"
              />
              <div className="max-w-2xl ml-6">
                <Search
                  className="py-3 text-lg rounded-2xl"
                  placeholder="Enter SOL amount"
                />
              </div>
              <div className="md:ml-6">
                <Button
                  text="Search"
                  shape="secondary"
                  className="ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
                />
              </div>
            </div>
          </div>
          <div className="block mt-[20px]">
            <ProposalExploreItem />
            <ProposalExploreItem />
            <ProposalExploreItem />
          </div>
        </div>
      </LayoutSection>
    </MainLayout>
  );
};

const ProfilePage: NextPage = () => {
  return (
    <ProfilePageProvider>
      <Layout />
    </ProfilePageProvider>
  );
};

export default ProfilePage;
