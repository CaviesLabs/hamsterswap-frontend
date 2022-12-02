import { SET_NFTS } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { NftDto } from "@/src/dto/nft.dto";

export default (state: NftDto[] = [], action: Action) => {
  if (action.type === SET_NFTS) {
    return action.payload;
  }
  return state;
};
