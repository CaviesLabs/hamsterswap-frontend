import { put, call } from "redux-saga/effects";
import { SagaPayload } from "@/src/redux/entities";
import { platformConfigService } from "@/src/redux/saga/platform-config/platform-config.service";
import { setPlatformConfig } from "@/src/redux/actions/platform-config/platform.action";
import { PlatformConfigDto } from "@/src/entities/platform-config.entity";

/**
 * @param payload
 * @param callback
 * @description
 * Fetch nft list
 */
export function* getPlatformConfig({
  callback,
}: SagaPayload<unknown, PlatformConfigDto>) {
  try {
    const resp: PlatformConfigDto = yield call(platformConfigService.get);
    yield put(setPlatformConfig(resp));
    callback && callback(resp);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
