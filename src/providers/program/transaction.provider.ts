import {
  AddressLookupTableAccount,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
  Commitment,
} from "@solana/web3.js";
import { Program } from "@project-serum/anchor";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { SwapIdl } from "./swap.idl";
import { LookupTableProvider } from "@/src/providers/program/lookup-table.provider";

export class TransactionProvider {
  constructor(
    /**
     * @dev Define network connection
     * @private
     */
    private readonly connection: Connection,
    /**
     * @dev This is to indicate whether the program is initialized or not.
     * @private
     */
    private readonly program: Program<SwapIdl>,
    private readonly lookupTableProvider: LookupTableProvider
  ) {}

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
   * @param commitment
   */
  public async signAndSendV0Transaction(
    walletProvider: WalletProvider,
    instructions: TransactionInstruction[],
    addressLookupTableAccounts: AddressLookupTableAccount[] = [],
    commitment: Commitment = "processed"
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
      commitment
    );

    return txId;
  }

  /**
   * @dev Get optimization and confirmation callback
   * @param walletProvider
   * @param instructions
   * @param accounts
   */
  public async buildV0TransactionHandlers(
    walletProvider: WalletProvider,
    instructions: TransactionInstruction[],
    accounts: PublicKey[]
  ): Promise<{
    optimize: () => Promise<void> | null;
    confirm: () => Promise<void>;
  }> {
    let optimize: () => Promise<void> | null = null;

    /**
     * @dev Get lookup table inx data
     */
    const { instructions: lookupTableInstruction, lookupTableAddress } =
      await this.lookupTableProvider.createOrExtendLookupTable(
        walletProvider,
        accounts
      );

    /**
     * @dev Initialize optimize callback
     */
    if (lookupTableInstruction.length > 0) {
      optimize = async () => {
        await this.signAndSendV0Transaction(
          walletProvider,
          lookupTableInstruction,
          [],
          "confirmed"
        );
      };
    }

    /**
     * @dev Initialize confirm callback
     */
    const lookupTableAccount =
      await this.lookupTableProvider.getLookupTableAccount(lookupTableAddress);
    const confirm = async () => {
      await this.signAndSendV0Transaction(
        walletProvider,
        instructions,
        [lookupTableAccount],
        "confirmed"
      );
    };

    /**
     * @dev Return callbacks
     */
    return {
      optimize,
      confirm,
    };
  }
}
