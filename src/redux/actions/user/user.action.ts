import { SET_CHAIN_ID } from "@/src/redux/actions";
import { ChainId } from "@/src/entities/chain.entity";

/**
 * @param chainId
 * @returns
 * @description
 * Update chainId in redux state
 */
export const setChainId = (chainId: ChainId) => ({
  type: SET_CHAIN_ID,
  payload: chainId,
});
