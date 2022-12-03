import { SET_H_PROFILE } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { hProfileDto } from "@/src/dto/hProfile.dto";

export default (state: hProfileDto = null, action: Action) => {
  if (action.type === SET_H_PROFILE) {
    return action.payload;
  }
  return state;
};
