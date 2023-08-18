import { GET_PLATFORM_CONFIG, SET_PLATFORM_CONFIG } from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";
import { PlatformConfigDto } from "@/src/entities/platform-config.entity";
import { ChainId } from "@/src/entities/chain.entity";

/**
 * @param callback
 * @returns
 * @description
 * Get platform config
 */
export const getPlatformConfig = (
  chainId: ChainId,
  callback?: CallBackSaga<PlatformConfigDto>
) => ({
  type: GET_PLATFORM_CONFIG,
  payload: { chainId },
  callback,
});

/**
 * @returns
 * @description
 * Update platform config
 */
export const setPlatformConfig = (data: PlatformConfigDto) => ({
  type: SET_PLATFORM_CONFIG,
  payload: data,
});
