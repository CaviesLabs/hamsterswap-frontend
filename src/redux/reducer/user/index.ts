import { ChainId } from "@/src/entities/chain.entity";
import { SET_CHAIN_ID, SET_USER } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { User } from "firebase/auth";

export default (state: User = null, action: Action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }
  return state;
};

export const chainIdReducer = (
  state: ChainId = ChainId.solana,
  action: Action
) => {
  if (action.type === SET_CHAIN_ID) {
    return action.payload;
  }
  return state;
};
