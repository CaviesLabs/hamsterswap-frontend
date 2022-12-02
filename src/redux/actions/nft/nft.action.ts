import { SET_NFTS, GET_LIST_NFT } from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";
import { NftDto, GetListNftDto } from "@/src/dto/nft.dto";

/**
 * @param emailSignUpDto
 * @param callback
 * @returns
 * @description
 * Register a new user with new email payload
 */
export const getListNft = (
  getListNftDto: GetListNftDto,
  callback: CallBackSaga<NftDto[]>
) => ({
  type: GET_LIST_NFT,
  payload: getListNftDto,
  callback,
});

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
