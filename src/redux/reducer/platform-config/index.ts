import { SET_PLATFORM_CONFIG } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { PlatformConfigDto } from "@/src/dto/platform-config";

export default (state: PlatformConfigDto = null, action: Action) => {
  if (action.type === SET_PLATFORM_CONFIG) {
    return action.payload;
  }
  return state;
};
