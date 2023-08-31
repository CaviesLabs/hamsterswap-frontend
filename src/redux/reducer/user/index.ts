import { ChainId } from "@/src/entities/chain.entity";
import { SET_CHAIN_ID } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";

export const chainIdReducer = (
  state: ChainId = ChainId.solana,
  action: Action
) => {
  if (action.type === SET_CHAIN_ID) {
    return action.payload;
  }
  return state;
};
