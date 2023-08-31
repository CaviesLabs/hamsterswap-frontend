import { FC, useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { ProfilePageProvider } from "@/src/hooks/pages/profile";
import { LayoutSection } from "@/src/components/layout-section";
import { UserInfoCard } from "@/src/components/user-card";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import MainLayout from "@/src/layouts/main";
import Breadcrumb from "@/src/components/user/breadcrumb";
import SubMenu from "@/src/components/user/sub-menu";
import Title from "@/src/components/user/history/title";
import Proposal from "@/src/components/user/history/proposal";
import { useMain } from "@/src/hooks/pages/main";
import { RefreshButton } from "@/src/components/refresh-button";
import { getProposalService } from "@/src/services/proposal.service";

const Layout: FC = () => {
  const router = useRouter();
  const { hPublicProfile: profile, proposals, chainId } = useMain();
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
    handleSearch();
    setRefreshing(false);
  }, [profile, chainId, setRefreshing]);

  /**
   * Fetch proposal by user id
   */
  const dispatch = useDispatch();
  const handleSearch = (_search?: string) => {
    dispatch(
      getExploreProposals({
        walletAddress: profile.walletAddress,
        options: {
          countParticipation: true,
          statuses: [SwapProposalStatus.SWAPPED, SwapProposalStatus.REDEEMED],
          search: _search,
        },
      })
    );
  };
  useEffect(() => {
    if (!profile || !profile.walletAddress) return;
    handleSearch();
  }, [profile]);

  return (
    <MainLayout>
      <Breadcrumb title="Profile" />
      <LayoutSection className="relative top-[-180px]">
        <div className="mb-[20px]">
          <div className="block mt-[20px]">
            {router.query.id && (
              <UserInfoCard userId={router.query.id as string} />
            )}
          </div>
        </div>
        <SubMenu curTab={1} />
        <div className="mt-10">
          <div className="flex items-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              History
            </h3>
            <RefreshButton
              loading={refreshing}
              handleClick={handleRefreshProposals}
            />
          </div>
          <Title />
          {proposals.map((_) => (
            <Proposal key={`proposal-${_.id}`} data={_} />
          ))}
        </div>
      </LayoutSection>
    </MainLayout>
  );
};

const HistoryPage: NextPage = () => {
  return (
    <ProfilePageProvider>
      <Layout />
    </ProfilePageProvider>
  );
};

export default HistoryPage;
