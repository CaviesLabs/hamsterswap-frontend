import { EmailSignUpDto } from "@/src/dto/email-signup.dto";
import { TokenSetEntity } from "@/src/entities/token-set.entity";
import { CallBackSaga } from "@/src/redux/entities";
import { SIGNUP_EMAIL } from "@/src/redux/actions";

/**
 * @param emailSignUpDto
 * @param callback
 * @returns
 * @description
 * Register a new user with new email payload
 */
export const signUpEmail = (
  emailSignUpDto: EmailSignUpDto,
  callback: CallBackSaga<TokenSetEntity>
) => ({
  type: SIGNUP_EMAIL,
  payload: emailSignUpDto,
  callback,
});
