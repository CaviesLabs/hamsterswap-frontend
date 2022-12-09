import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { GetListNftDto, NftEntity } from "@/src/dto/nft.dto";
import { nftService } from "@/src/redux/saga/nft/nft.service";
import { setNft } from "@/src/redux/actions/nft/nft.action";

/**
 * @param payload
 * @param callback
 * @description
 * Fetch nft list
 */
export function* getListNft({
  payload,
  callback,
}: SagaPayload<GetListNftDto, NftEntity[]>) {
  try {
    const nft: NftEntity[] = yield call(nftService.listNft, payload);
    yield put(setNft(nft));
    callback && callback(nft);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
