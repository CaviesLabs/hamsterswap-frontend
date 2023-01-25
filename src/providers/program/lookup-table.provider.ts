import { BN, Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { SwapIdl } from "@/src/providers/program/swap.idl";
import {
  AddressLookupTableAccount,
  AddressLookupTableProgram,
  Connection,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import _ from "lodash";

export class LookupTableProvider {
  /**
   * @dev Constructor that initializes address lookup table provider
   * @param connection
   * @param program
   */
  constructor(
    private readonly connection: Connection,
    private readonly program: Program<SwapIdl>
  ) {}

  /**
   * @dev Get lookup table registry
   * @private
   */
  private getLookupTableRegistryAddress() {
    /**
     * @dev Find the program address
     */
    const [lookupTableRegistry] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::LOOKUP_TABLE_SEED"),
        this.program.provider.publicKey.toBytes(),
      ],
      this.program.programId
    );

    /**
     * @dev Return
     */
    return lookupTableRegistry;
  }

  /**
   * @dev Create lookup table registry instruction
   * @private
   */
  private async createLookupTableRegistryInstruction(): Promise<{
    account: PublicKey;
    instruction: TransactionInstruction;
  } | null> {
    const lookupTableRegistryAddress = this.getLookupTableRegistryAddress();

    /**
     * @dev Return null if the account was already initialized
     */
    if (!!(await this.connection.getAccountInfo(lookupTableRegistryAddress))) {
      return null;
    }

    /**
     * @dev Return instruction if we need
     */
    return {
      account: lookupTableRegistryAddress,
      instruction: await this.program.methods
        .initializeAddressLookupTable()
        .accounts({
          lookupTableRegistry: lookupTableRegistryAddress,
          signer: this.program.provider.publicKey,
        })
        .instruction(),
    };
  }

  /**
   * @dev Get lookup table account
   * @private
   */
  private async getLookupTableAddress(): Promise<PublicKey | null> {
    /**
     * @dev Get lookup table registry
     */
    const lookupTableRegistryAddress = this.getLookupTableRegistryAddress();

    let registryAccount;

    try {
      /**
       * @dev Get lookup table
       */
      registryAccount = await this.program.account.lookupTableRegistry.fetch(
        lookupTableRegistryAddress
      );
    } catch {
      /**
       * @dev Return null if error occurs here
       */
      return null;
    }

    /**
     * @dev Get latest lookup table address
     */
    return registryAccount.lookupTableAddresses.reverse()[0] || null;
  }

  /**
   * @dev Get lookup table account
   * @param address
   * @private
   */
  public getLookupTableAccount(
    address: PublicKey
  ): Promise<AddressLookupTableAccount> {
    return this.connection
      .getAddressLookupTable(address, { commitment: "finalized" })
      .then((res) => res.value);
  }

  /**
   * @dev Detect whether the lookup table reached max limit
   * @param account
   * @private
   */
  private static isLookupTableReachedMaxLimit(
    account: AddressLookupTableAccount
  ): boolean {
    return account.state.addresses.length === 256;
  }

  /**
   * @dev Extend lookup table
   * @param walletProvider
   * @param accounts
   * @return Returns null if there are no addresses need to be whitelisted,
   * returns instructions if there are addresses need to be whitelisted.
   */
  public async createOrExtendLookupTable(
    walletProvider: WalletProvider,
    accounts: PublicKey[]
  ): Promise<{
    instructions: TransactionInstruction[];
    lookupTableAddress: PublicKey;
  } | null> {
    const instructions: TransactionInstruction[] = [];

    /**
     * @dev Binding lookup table address
     */
    let lookupTableAddress: PublicKey;

    /**
     * @dev Create lookup table registry if needed
     */
    const createLookupTablePayload =
      await this.createLookupTableRegistryInstruction();

    /**
     * @dev This is the case when user first interacts with contract
     */
    if (createLookupTablePayload) {
      /**
       * @dev Push
       */
      instructions.push(createLookupTablePayload.instruction);
    }

    /**
     * @dev Get lookup table address
     */
    lookupTableAddress = await this.getLookupTableAddress();

    /**
     * @dev Detect whether the lookup table account reached limit
     */
    const isLookupTableReachedLimit =
      !!lookupTableAddress &&
      LookupTableProvider.isLookupTableReachedMaxLimit(
        await this.getLookupTableAccount(lookupTableAddress)
      );

    if (
      createLookupTablePayload !== null ||
      lookupTableAddress === null ||
      isLookupTableReachedLimit
    ) {
      const slot = await this.connection.getSlot({
        commitment: "finalized",
      });

      /**
       * @dev Initializes instruction and new lookup table address
       */
      const [, _lookupTableAddress] =
        AddressLookupTableProgram.createLookupTable({
          recentSlot: slot,
          authority: this.program.provider.publicKey,
          payer: this.program.provider.publicKey,
        });

      /**
       * @dev Re-bind the lookup table address
       */
      lookupTableAddress = _lookupTableAddress;

      /**
       * @dev Also push into the transaction instructions
       */
      instructions.push(
        await this.program.methods
          .modifyAddressLookupTable({
            slot: new BN(slot),
          })
          .accounts({
            lookupTableRegistry: this.getLookupTableRegistryAddress(),
            signer: this.program.provider.publicKey,
            lookupTableAccount: lookupTableAddress,
            lookupTableProgram: AddressLookupTableProgram.programId,
          })
          .instruction()
      );
    }

    /**
     * @dev Extend instruction
     */
    const extendInstruction = await this.extendLookupTable(
      walletProvider,
      lookupTableAddress,
      accounts
    );

    /**
     * @dev No need to extend
     */
    if (extendInstruction === null) {
      return {
        instructions: [],
        lookupTableAddress,
      };
    }

    /**
     * @dev Return instructions
     */
    instructions.push(extendInstruction);

    /**
     * @dev Return
     */
    return {
      instructions,
      lookupTableAddress,
    };
  }

  /**
   * @dev Extend lookup table
   * @param walletProvider
   * @param lookupTableAddress
   * @param accounts
   * @return Returns null if there are no addresses need to be whitelisted,
   * returns instructions if there are addresses need to be whitelisted.
   */
  private async extendLookupTable(
    walletProvider: WalletProvider,
    lookupTableAddress: PublicKey,
    accounts: PublicKey[]
  ): Promise<TransactionInstruction | null> {
    const uniqueAccounts = _.uniq(accounts.map((elm) => elm.toBase58())).map(
      (elm) => new PublicKey(elm)
    );

    /**
     * @dev Check if lookup table account already existed
     */
    const lookupTableAccount = await this.getLookupTableAccount(
      lookupTableAddress
    );

    /**
     * @dev Check for whitelisted addresses
     */
    const needToWhitelistedAddresses =
      lookupTableAccount === null
        ? uniqueAccounts
        : uniqueAccounts.filter(
            (elm) =>
              !lookupTableAccount.state.addresses
                .map((addr) => addr.toBase58())
                .includes(elm.toBase58())
          );

    try {
      console.log({
        needToWhitelistedAddresses: needToWhitelistedAddresses.map((elm) =>
          elm.toBase58()
        ),
        uniqueAccounts: uniqueAccounts.map((elm) => elm.toBase58()),
        accounts: lookupTableAccount.state.addresses.map((elm) =>
          elm.toBase58()
        ),
      });
    } catch {}

    if (needToWhitelistedAddresses.length > 0) {
      /**
       * @dev Extend lookup table
       */
      return AddressLookupTableProgram.extendLookupTable({
        payer: walletProvider.publicKey,
        authority: walletProvider.publicKey,
        lookupTable: lookupTableAddress,
        /**
         * @dev This is to reduce the transaction cost/size
         */
        addresses: needToWhitelistedAddresses,
      });
    }

    /**
     * @dev Return null if there are no addresses need to be whitelisted
     */
    return null;
  }
}
