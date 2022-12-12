import { createContext, useContext } from "react";

/** @dev Export state contained in page interface */
export interface ProfilePageContextState {
  /**
   * @dev Filter props status
   */
  selectedStatus: string[];

  /**
   * @dev Update search value
   */
  search: string;

  /**
   * @dev Change status to filter
   * @param {string} val
   */
  setSelectedStatus(val: string[]): void;

  /**
   * @dev Change search value
   * @param {string} val
   */
  setSearch(val: string): void;

  /**
   * @dev The function to handle filtering.
   * @param {string} searchText
   * @param {string[]} _selectedStatus
   */
  handleFilter(searchText?: string, _selectedStatus?: string[]): void;
}

/** @dev Create context */
export const ProfilePageContext = createContext<ProfilePageContextState>(null);

/** @dev Export use context function */
export const useProfilePage = () => {
  const context = useContext(ProfilePageContext);
  if (context === undefined) {
    throw new Error("Muse be in context provider");
  }
  return context;
};
