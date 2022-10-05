import { NetworkProvider } from "@/src/providers/network.provider";
import { TokenSetEntity } from "@/src/entities/token-set.entity";
import { EmailSignUpDto } from "@/src/dto/email-signup.dto";

export class AuthService extends NetworkProvider {
  public async signUpEmail(
    emailSignUpDto: EmailSignUpDto
  ): Promise<TokenSetEntity> {
    return this.request<TokenSetEntity>("/auth/signup", {
      method: "POST",
      data: emailSignUpDto,
    });
  }
}

export const authService = new AuthService();
