import { ReactNode, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { sortOptions } from "@/src/utils";
import { ProfilePageContext } from "./types";
import { useMain } from "@/src/hooks/pages/main";

export const ProfilePageProvider = (props: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { hPublicProfile: profile, chainId } = useMain();
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  /**
   * @description
   * handle parse status to filter and search nft
   */
  const handleFilter = useCallback(
    (searchText: string = search, statuses: string[] = selectedStatus) => {
      if (!profile?.walletAddress) return;

      const status: SwapProposalStatus[] =
        !statuses || statuses.length === 0 ? [] : [];
      statuses?.includes(sortOptions[0].value) &&
        status.push(SwapProposalStatus.ACTIVE);
      statuses?.includes(sortOptions[1].value) &&
        status.push(SwapProposalStatus.EXPIRED);
      statuses?.includes(sortOptions[2].value) &&
        status.push(SwapProposalStatus.REDEEMED);
      statuses?.includes(sortOptions[3].value) &&
        status.push(SwapProposalStatus.WITHDRAWN);
      statuses?.includes(sortOptions[4].value) &&
        status.push(SwapProposalStatus.SWAPPED);

      dispatch(
        getExploreProposals({
          walletAddress: profile?.walletAddress,
          options: {
            search: searchText,
            statuses: status,
            chainId,
          },
        })
      );
    },
    [profile, chainId]
  );

  return (
    <ProfilePageContext.Provider
      value={{
        search,
        selectedStatus,
        setSearch,
        setSelectedStatus,
        handleFilter,
      }}
    >
      {props.children}
    </ProfilePageContext.Provider>
  );
};
