/**
 * @dev Export hook state.
 */
export interface ProgramHookState {
  /**
   * @dev The function to redeem proposal.
   * @param {string} proposalId
   */
  redeemProposal(
    proposalId: string
  ): Promise<void | { optimize(): Promise<void>; confirm(): Promise<void> }>;

  /**
   * @dev The function to cancel propsal.
   * @param {string} proposalId
   */
  cancelProposal(
    proposalId: string
  ): Promise<void | { optimize(): Promise<void>; confirm(): Promise<void> }>;
}
