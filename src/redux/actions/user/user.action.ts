import { User } from "firebase/auth";
import { SET_USER, SET_CHAIN_ID } from "@/src/redux/actions";
import { ChainId } from "@/src/entities/chain.entity";

/**
 * @param user
 * @returns
 * @description
 * Update user profile in redux state
 */
export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

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
