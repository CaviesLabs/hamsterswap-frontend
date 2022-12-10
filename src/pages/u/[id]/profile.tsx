import { FC, useEffect, useMemo } from "react";
import type { NextPage } from "next";
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
import { useDispatch, useSelector } from "react-redux";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import State from "@/src/redux/entities/state";
import {
  SwapItemEntity,
  SwapOptionEntity,
  SwapProposalEntity,
  SwapProposalStatus,
} from "@/src/entities/proposal.entity";

const Layout: FC = () => {
  const router = useRouter();
  const profile = useSelector((state: State) => state.hPublicProfile);
  const proposals = useSelector((state: State) => state.proposals);

  /**
   * Fetch proposal by user id
   */
  const dispatch = useDispatch();
  const handleSearch = (_search?: string) => {
    dispatch(
      getExploreProposals({
        walletAddress: profile.walletAddress,
        options: {
          statuses: [
            SwapProposalStatus.DEPOSITED,
            SwapProposalStatus.FULFILLED,
            SwapProposalStatus.CANCELED,
          ],
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
            {useMemo(() => {
              return (
                router.query.id && (
                  <UserInfoCard userId={router.query.id as string} />
                )
              );
            }, [router.query])}
          </div>
        </div>
        <SubMenu curTab={0} />
        <div className="mb-4 mt-10">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Proposal
          </h3>
          <div className="block py-[50px]">
            <div className="md:flex items-center">
              <p>Sort by</p>
              <Select
                placeholder={
                  <>
                    <div></div>
                    <div className="text-center">All status</div>
                  </>
                }
                options={sortOptions.map((_) => ({
                  value: _.value,
                }))}
                className="w-44 ml-6"
              />
              <div className="ml-6 w-full max-w-md">
                <Search
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
                />
              </div>
            </div>
          </div>
          {proposals?.map((proposal: SwapProposalEntity) => {
            const p: any = { ...proposal };
            const newOfferItems = p.offerItems.map(
              (offerItem: SwapItemEntity) => parseProposal(offerItem)
            );
            const newSwapOptions = p.swapOptions.map(
              (swapOption: SwapOptionEntity) => {
                return swapOption.items.map((_) => parseProposal(_));
              }
            );
            p.offerItems = newOfferItems;
            p.swapOptions = newSwapOptions;
            return (
              <ProposalDetail
                key={p.id}
                data={p}
                status={p.status}
                proposalId={proposal.id}
                proposalOwner={proposal.ownerAddress || proposal.owner}
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
