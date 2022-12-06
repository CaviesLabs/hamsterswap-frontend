import { SET_NFT } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { NftDto } from "@/src/dto/nft.dto";

export default (state: NftDto = null, action: Action) => {
  if (action.type === SET_NFT) {
    return action.payload;
  }
  return state;
};
