import { SET_NFTS } from "@/src/redux/actions";
import { NftDto } from "@/src/dto/nft.dto";

/**
 * @param nfts
 * @returns
 * @description
 * Update nft list in redux state
 */
export const setNfts = (data: NftDto[]) => ({
  type: SET_NFTS,
  payload: data,
});
