import { ReactNode, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { getExploreProposals } from "@/src/redux/actions/proposal/proposal.action";
import { getProposalService } from "@/src/services/proposal.service";
import { SwapProposalStatus } from "@/src/entities/proposal.entity";
import { useMain } from "@/src/hooks/pages/main";
import { sortOptions } from "@/src/utils";
import { ProfilePageContext } from "./types";

export const ProfilePageProvider = (props: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { hPublicProfile: profile, chainId } = useMain();
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  /**
   * @dev The function is used to filter the proposals based on the search text and status
   * @param {string} searchText
   * @param {string[]} statuses
   * @returns {void}
   */
  const handleFilter = useCallback(
    async (
      searchText: string = search,
      statuses: string[] = selectedStatus
    ) => {
      if (!profile?.walletAddress) return;

      // @notice Process the status to get the status array
      const status: SwapProposalStatus[] = [];
      sortOptions.forEach(
        (option) => statuses.includes(option.value) && status.push(option.value)
      );

      // @notice Sync the wallet proposals before fetching the proposals
      await getProposalService().syncWalletProposals(
        chainId,
        profile?.walletAddress
      );

      // @notice Get the proposals based on the search text and status
      // eslint-disable-next-line prettier/prettier
      dispatch(getExploreProposals({
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
