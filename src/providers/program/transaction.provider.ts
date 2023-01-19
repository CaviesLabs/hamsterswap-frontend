import {
  AddressLookupTableAccount,
  Connection,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { SwapIdl } from "./swap.idl";

export class TransactionProvider {
  /**
   * @dev Define network connection
   * @private
   */
  private readonly connection: Connection;

  /**
   * @dev This is to indicate whether the program is initialized or not.
   * @private
   */
  private readonly program: Program<SwapIdl>;

  constructor(connection: Connection, program: Program<SwapIdl>) {
    this.connection = connection;
    this.program = program;
  }

  /**
   * @dev The function to create transaction with given instructions then sign and send to chain.
   * @public
   * @param walletProvider
   * @param instructions
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
    return this.connection.sendRawTransaction(rawTx.serialize());
  }

  /**
   * @dev The function sign and send v0 transaction with/without address lookup table
   * @param walletProvider
   * @param instructions
   * @param addressLookupTableAccounts
   */
  public async signAndSendV0Transaction(
    walletProvider: WalletProvider,
    instructions: TransactionInstruction[],
    addressLookupTableAccounts: AddressLookupTableAccount[] = []
  ): Promise<string> {
    const latestBlockHash = await this.connection.getLatestBlockhash();

    /**
     * @dev Compile lookup message
     */
    const lookupMessage = new TransactionMessage({
      payerKey: walletProvider.publicKey,
      recentBlockhash: latestBlockHash.blockhash,
      instructions: instructions,
    }).compileToV0Message(addressLookupTableAccounts);

    /**
     * @dev Sign v0 message
     */
    const lookupTransaction = new VersionedTransaction(lookupMessage);
    const tx = await walletProvider.signTransaction(lookupTransaction);

    /**
     * @dev Send a raw transaction.
     */
    const txId = await this.connection.sendRawTransaction(tx.serialize());
    await this.connection.confirmTransaction(
      {
        signature: txId,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      },
      "finalized"
    );

    return txId;
  }
}
