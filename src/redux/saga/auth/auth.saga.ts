import { call } from "redux-saga/effects";
import { TokenSetEntity } from "@/src/entities/token-set.entity";
import { EmailSignUpDto } from "@/src/dto/email-signup.dto";
import { authService } from "./auth.service";
import { SagaPayload } from "../../entities";

/**
 * @param callback
 * @description
 * Fetch user profile data with credential JWT localstorage value
 */
export function* signUpWithEmail({
  payload,
  callback,
}: SagaPayload<EmailSignUpDto, TokenSetEntity>) {
  try {
    const tokenSetEntity: TokenSetEntity = yield call(
      authService.signUpEmail,
      payload
    );

    callback && callback(tokenSetEntity);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
