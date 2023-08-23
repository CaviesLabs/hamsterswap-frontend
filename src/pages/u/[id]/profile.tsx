import { FC, useEffect, useMemo, useCallback, useState } from "react";
import { type NextPage } from "next";
import MainLayout from "@/src/layouts/main";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import { parseProposal, sortOptions } from "@/src/utils";
import { Button } from "@hamsterbox/ui-kit";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import Select from "@/src/components/select";
import Search from "@/src/components/search";
import { ProposalDetail } from "@/src/components/user/proposal-detail";
import { useRouter } from "next/router";
import {
  SwapItemEntity,
  SwapOptionEntity,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { useProfilePage } from "@/src/hooks/pages/profile";
import { RefreshButton } from "@/src/components/refresh-button";
import { getProposalService } from "@/src/services/proposal.service";
import { useMain } from "@/src/hooks/pages/main";

const Layout: FC = () => {
  const router = useRouter();
  const {
    hPublicProfile: profile,
    proposals,
    platformConfig,
    chainId,
  } = useMain();

  const { selectedStatus, search, setSelectedStatus, setSearch, handleFilter } =
    useProfilePage();

  const [refreshing, setRefreshing] = useState(false);

  /**
   * @dev Handle refresh proposals.
   * @note This is a temporary solution.
   */
  const handleRefreshProposals = useCallback(async () => {
    if (!profile) return;
    setRefreshing(true);
    await getProposalService().syncWalletProposals(
      chainId,
      profile?.walletAddress
    );
    handleFilter(search, selectedStatus);
    setRefreshing(false);
  }, [profile, search, selectedStatus, setRefreshing]);

  /**
   * @dev Watch changes of selected status to filter proposals.
   * @note This is a temporary solution.
   */
  useEffect(
    () => handleFilter(search, selectedStatus),
    [selectedStatus, profile]
  );

  return (
    <MainLayout>
      <Breadcrumb title="Profile" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            {useMemo(() => {
              return (
                router.query.id && (
                  <UserInfoCard userId={router.query.id as string} />
                )
              );
            }, [router.query, profile])}
          </div>
        </div>
        <SubMenu curTab={0} />
        <div className="mb-4 mt-10">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mr-[20px]">
              Your Proposal
            </h3>
            <RefreshButton
              loading={refreshing}
              handleClick={handleRefreshProposals}
            />
          </div>
          <div className="block py-[50px]">
            <div className="md:flex items-center">
              <p>Filter by</p>
              <Select
                mode="multiple"
                placeholder={
                  <>
                    <div></div>
                    <div>
                      {!selectedStatus.length || selectedStatus.length === 5
                        ? "All status"
                        : selectedStatus.join(", ")}
                    </div>
                  </>
                }
                options={sortOptions.map((_) => ({
                  value: _.value,
                  label: _.name,
                }))}
                className="w-[260px] ml-6"
                values={selectedStatus}
                onChange={(v) => setSelectedStatus(v)}
              />
              <div className="ml-6 w-full max-w-md">
                <Search
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 text-[14px] rounded-3xl"
                  placeholder="Search by NFT name, collection, game, seller"
                />
              </div>
              <div className="md:ml-4">
                <Button
                  text="Search"
                  shape="secondary"
                  size="xsmall"
                  className="!rounded-[100px] after:!rounded-[100px] !w-[100px]"
                  onClick={() => handleFilter(search, selectedStatus)}
                />
              </div>
            </div>
          </div>
          {proposals?.map((proposal: SwapProposalEntity) => {
            return (
              <ProposalDetail
                key={proposal.id}
                data={proposal}
                status={proposal.status}
                proposalId={proposal.id}
                proposalOwner={proposal.ownerAddress}
                swapItems={proposal.offerItems.map(
                  (offerItem: SwapItemEntity) =>
                    parseProposal(offerItem, platformConfig?.allowCurrencies)
                )}
                receiveItems={proposal.swapOptions.map(
                  (swapOption: SwapOptionEntity) => {
                    return {
                      ...swapOption,
                      items: swapOption.items.map((item) =>
                        parseProposal(item, platformConfig?.allowCurrencies)
                      ),
                    };
                  }
                )}
              />
            );
          })}
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
