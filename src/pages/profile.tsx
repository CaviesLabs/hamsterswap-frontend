import { FC, useState } from "react";
import type { NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { ProposalExploreItem } from "@/src/components/proposal-item";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import { BreadCrumb } from "@/src/components/bread-crumb";
import { sortOptions } from "@/src/utils";
import classnames from "classnames";
import { Button } from "@hamsterbox/ui-kit";
import { Select } from "antd";

const Layout: FC = () => {
  /** @dev Storage sort value, default is @var {sortOptions[0]} */
  const [sortValue, setSortValue] = useState(sortOptions[0].value);

  /** @dev The value to display tab which its selected. */
  const [curTab, setCurTab] = useState(0);

  return (
    <MainLayout>
      <div className="cover-container bg-purpleBg">
        <LayoutSection className="!min-h-[350px]">
          <BreadCrumb data={["Home", "Profile"]} />
          <div className="mt-[20px] block md:flex">
            <p className="text-[32px]">Profile</p>
          </div>
        </LayoutSection>
      </div>
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            <UserInfoCard userId="sda" />
          </div>
        </div>
        <div className="py-[40px]">
          <div className="flex justify-center items-center">
            {[
              ["Proposal"],
              ["History"],
              ["Game ID"],
              ["Payment"],
              ["Contacts"],
            ].map((item, index) => (
              <div
                onClick={() => setCurTab(index)}
                key={`tabt-title-${index}`}
                className="px-[40px] h-[30px]"
              >
                <p
                  className={classnames(
                    "px-[10px] cursor-pointer text-dark60",
                    {
                      "!text-purple": index === curTab,
                    }
                  )}
                >
                  {item}
                </p>
                {index === curTab && (
                  <div className="w-full h-[4px] bg-purple rounded-[3px] mt-[10px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-[20px] mt-[50px]">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Proposal
          </h3>
          <div className="block py-[50px]">
            <div className="md:flex items-center">
              <div className="flex md:float-left items-center">
                <p>Sort by</p>
                <div className="float-left ml-[12px]">
                  <Select
                    options={sortOptions.map((_) => ({
                      label: _.name,
                      value: _.value,
                    }))}
                    className="w-44 text-center text-sm text-gray-500 font-medium regular-text rounded-2xl"
                    defaultValue={
                      sortOptions.find((_) => _.value === "success").value
                    }
                    onChange={(v) => setSortValue(v)}
                    size="large"
                  ></Select>
                </div>
              </div>
              <div className="flex md:float-left items-center md:pl-[12px]">
                <div className="relative">
                  <input
                    type="text"
                    className="border-[1px] border-solid border-dark30 rounded-[16px] w-full pl-[64px] pr-[10px] py-[16px] focus:ring-0 focus:outline-0 regular-text md:w-[444px]"
                    placeholder="Enter SOL amount"
                  />
                  <img
                    src="/assets/images/search-icon.svg"
                    alt="Solana Icon"
                    className="!w-[24px] h-[24px] absolute left-[24px] top-[16px]"
                  />
                </div>
              </div>
              <div className="md:float-left md:pl-[12px]">
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
        {/* <div className="flow-root">
          <Button
            text="Order / Bid"
            shape="secondary"
            className="ml-[24px] !rounded-[100px] after:!rounded-[100px] float-right !w-[150px] md:!w-[200px]"
          />
          <Button
            text="Buy"
            className="!rounded-[100px] after:!rounded-[100px] float-right !w-[120px] md:!w-[200px]"
          />
        </div> */}
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
