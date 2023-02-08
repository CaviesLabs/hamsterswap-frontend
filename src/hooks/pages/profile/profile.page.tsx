import { ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { useMain } from "@/src/hooks/pages/main";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { sortOptions } from "@/src/utils";
import { ProfilePageContext } from "./types";

export const ProfilePageProvider = (props: { children: ReactNode }) => {
  const { hPublicProfile: profile } = useMain();

  /**
   * @description
   * Fetch proposal by user id
   */
  const dispatch = useDispatch();

  /**
   * @dev The function to process searching
   * @param {string} _search
   * @param {string} _statuses
   */
  const handleSearch = (_search?: string, _statuses?: SwapProposalStatus[]) => {
    dispatch(
      getExploreProposals({
        walletAddress: profile?.walletAddress,
        options: {
          statuses: _statuses,
          search: _search,
        },
      })
    );
  };

  /**
   * @description
   * Handle state of selected values
   */
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  /**
   * @dev Define search value.
   */
  const [search, setSearch] = useState<string>("");

  /**
   * @description
   * handle parse status to filter and search nft
   */
  const handleFilter = (
    searchText: string = search,
    _selectedStatus: string[] = selectedStatus
  ) => {
    const status: SwapProposalStatus[] =
      !_selectedStatus || _selectedStatus.length === 0 ? [] : [];
    _selectedStatus?.includes(sortOptions[0].value) &&
      status.push(SwapProposalStatus.ACTIVE);
    _selectedStatus?.includes(sortOptions[1].value) &&
      status.push(SwapProposalStatus.EXPIRED);
    _selectedStatus?.includes(sortOptions[2].value) &&
      status.push(SwapProposalStatus.REDEEMED);
    _selectedStatus?.includes(sortOptions[3].value) &&
      status.push(SwapProposalStatus.WITHDRAWN);
    _selectedStatus?.includes(sortOptions[4].value) &&
      status.push(SwapProposalStatus.SWAPPED);

    return handleSearch(searchText, status);
  };

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
