import { SET_USER } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";
import { UserEntity } from "@/src/entities/user.entity";

export default (state: UserEntity = null, action: Action) => {
  if (action.type === SET_USER) {
    return action.payload;
  }
  return state;
};
