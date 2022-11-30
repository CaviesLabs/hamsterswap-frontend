import { User } from "firebase/auth";
import { GET_USER_PROFILE, SET_USER } from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";

/**
 * @param callback
 * @returns profile data
 * @description
 * Fetch user profile with credential
 */
export const getUser = (callback?: CallBackSaga<User>) => ({
  type: GET_USER_PROFILE,
  callback,
});

/**
 * @param user
 * @returns
 * @description
 * Update user profile in redux state
 */
export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});
