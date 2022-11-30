import { SET_USER } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { User } from "firebase/auth";

export default (state: User = null, action: Action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }
  return state;
};
