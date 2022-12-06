import {
  GET_H_PROFILE,
  GET_H_PUBLIC_PROFILE,
  SET_H_PROFILE,
  SET_H_PUBLIC_PROFILE,
} from "@/src/redux/actions";
import { hProfileDto } from "@/src/dto/hProfile.dto";
import { CallBackSaga } from "@/src/redux/entities";
import { DetailDto } from "@/src/dto/detail.dto";

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

/**
 * @param {hProfileDto} payload
 * @param callback
 * @returns
 * @description
 * Get hamster public profile with user id
 */
export const getHamsterPublicProfile = (
  payload?: DetailDto,
  callback?: CallBackSaga<hProfileDto>
) => ({
  type: GET_H_PUBLIC_PROFILE,
  payload,
  callback,
});

/**
 * @param {hProfileDto} data
 * @returns
 * @description
 * Update public profile in redux state
 */
export const setPublicProfile = (data: hProfileDto) => ({
  type: SET_H_PUBLIC_PROFILE,
  payload: data,
});
