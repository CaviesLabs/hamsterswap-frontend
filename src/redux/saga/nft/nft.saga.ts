import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { ListNftDto, NftDto } from "@/src/dto/nft.dto";
import { nftService } from "@/src/redux/saga/nft/nft.service";
import { setNfts } from "@/src/redux/actions/nft/nft.action";

/**
 * @param payload
 * @param callback
 * @description
 * Fetch nft list
 */
export function* listNft({
  payload,
  callback,
}: SagaPayload<ListNftDto, NftDto[]>) {
  try {
    const nfts: NftDto[] = yield call(nftService.listNft, payload);
    yield put(setNfts(nfts));
    callback && callback(nfts);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
