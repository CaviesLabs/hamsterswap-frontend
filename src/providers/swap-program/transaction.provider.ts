import {
  Connection,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";

export class TransactionProvider {
  /**
   * @dev Define network connection
   * @private
   */
  private readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  /**
   * @dev The function to create transaction with given instructions then sign and send to chain.
   * @param {WalletProvider} Provider to sign transaction.
   * @param {Transaction} @arrays instructions
   * @public
   */
  public async signAndSendTransaction(
    walletProvider: WalletProvider,
    instructions: TransactionInstruction[]
  ) {
    /**
     * @dev Setup tx by creating a transaction which includes all instructions which users want to process.
     */
    const tx = new Transaction().add(...instructions);
    tx.recentBlockhash = (await this.connection.getLatestBlockhash()).blockhash;
    tx.feePayer = walletProvider.publicKey;

    /**
     * @dev Get raw transaction by signing in wallet.
     */
    const rawTx = await walletProvider.signTransaction(tx);

    /**
     * @dev Send a raw transaction.
     */
    const txid = await this.connection.sendRawTransaction(rawTx.serialize());
    return txid;
  }
}
