import { sign } from "tweetnacl";
import * as bs from "bs58";

export class SolanaSigner {
  /**
   * @dev The function to verify message signature.
   * @param {string} message The message to verify.
   * @param {Uint8Array} signedData The data to verify.
   * @param {string} walletAddress The address to verify.
   */
  static verify(
    message: string,
    signedData: Uint8Array,
    walletAddress: string
  ): boolean {
    const encodedMessage = new TextEncoder().encode(message);
    return sign.detached.verify(
      encodedMessage,
      signedData,
      bs.decode(walletAddress)
    );
  }
}
