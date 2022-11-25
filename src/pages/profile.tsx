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

const Layout: FC = () => {
  /** @dev Condition to display sort select. */
  const [sortDisplayed, setSortDisplayed] = useState(false);

  /** @dev Storage sort value, default is @var {sortOptions[0]} */
  const [sortValue, setSortValue] = useState(sortOptions[0]);

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
                  <button
                    id="states-button"
                    data-dropdown-toggle="dropdown-states"
                    className="z-10 items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 focus:ring-0 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 w-44 rounded-[16px] text-center flow-root regular-text"
                    type="button"
                    onClick={() => setSortDisplayed((prev) => !prev)}
                  >
                    {sortValue.name}
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 ml-1 float-right"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  {sortDisplayed && (
                    <div className="relative">
                      <div
                        className="z-4 bg-white divide-y divide-gray-100 rounded w-44 h-[200px] dark:bg-gray-700 top-[10px] absolute"
                        style={{ zIndex: 200 }}
                      >
                        <ul
                          className="py-1 text-sm text-gray-700 dark:text-gray-200 h-[200px] overflow-y-scroll rounded-[16px] border-[1px] border-solid border-dark10"
                          aria-labelledby="states-button"
                        >
                          {sortOptions.map((item, index) => (
                            <li key={`prp-${index}`}>
                              <button
                                type="button"
                                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setSortDisplayed(false);
                                  setSortValue(item);
                                }}
                              >
                                <p className="text-center relative left-[-10px] regular-text">
                                  {item.name}
                                </p>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
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
