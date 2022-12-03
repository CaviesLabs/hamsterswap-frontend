import { GET_H_PROFILE, SET_H_PROFILE } from "@/src/redux/actions";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { CallBackSaga } from "@/src/redux/entities";

/**
 * @param {hProfileDto} payload
 * @param callback
 * @returns
 * @description
 * Get hamster profile with credential
 */
export const getHamsterProfile = (
  payload?: hProfileDto,
  callback?: CallBackSaga<hProfileDto>
) => ({
  type: GET_H_PROFILE,
  payload,
  callback,
});

/**
 * @param {hProfileDto} data
 * @returns
 * @description
 * Update profile in redux state
 */
export const setProfile = (data: hProfileDto) => ({
  type: SET_H_PROFILE,
  payload: data,
});
