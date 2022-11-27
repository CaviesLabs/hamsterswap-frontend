import { sign } from "tweetnacl";
import * as bs from "bs58";

export class SolanaSigner {
  static verify(
    message: string,
    signedData: Uint8Array,
    walletAddress: string
  ): boolean {
    console.log(signedData);
    const encodedMessage = new TextEncoder().encode(message);
    return sign.detached.verify(
      encodedMessage,
      signedData,
      bs.decode(walletAddress)
    );
  }
}
