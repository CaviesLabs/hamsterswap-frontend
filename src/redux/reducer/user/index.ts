import { SET_USER } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";

export default (state: any = null, action: Action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }
  return state;
};
