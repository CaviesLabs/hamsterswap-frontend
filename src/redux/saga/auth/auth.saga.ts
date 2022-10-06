import { call } from "redux-saga/effects";
import { TokenSetEntity } from "@/src/entities/token-set.entity";
import { EmailSignUpDto } from "@/src/dto/email-signup.dto";
import { SagaPayload } from "@/src/redux/entities";
import { getStorageProvider } from "@/src/providers";
import { authService } from "./auth.service";

const storageProvider = getStorageProvider();

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

    /**
     * @dev
     * Save credential into localstorage for authentication
     */
    storageProvider.setItem("jwt", tokenSetEntity.access_token);

    callback && callback(tokenSetEntity);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}
