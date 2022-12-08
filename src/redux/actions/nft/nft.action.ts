import { SET_NFT, GET_LIST_NFT } from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";
import { NftDto, GetListNftDto, NftEntity } from "@/src/dto/nft.dto";

/**
 * @param {GetListNftDto} getListNftDto
 * @param callback
 * @returns
 * @description
 * Get list of NFT with user wallet
 */
export const getListNft = (
  getListNftDto: GetListNftDto,
  callback?: CallBackSaga<NftDto>
) => ({
  type: GET_LIST_NFT,
  payload: getListNftDto,
  callback,
});

/**
 * @param nft
 * @returns
 * @description
 * Update nft list in redux state
 */
export const setNft = (data: NftEntity[]) => ({
  type: SET_NFT,
  payload: data,
});
