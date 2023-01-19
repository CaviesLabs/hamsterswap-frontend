import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { SwapIdl } from "@/src/providers/program/swap.idl";

import {
  AddressLookupTableProgram,
  Connection,
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";

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
  private getLookupTableRegistry() {
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
    const lookupTableRegistryAccount = this.getLookupTableRegistry();

    /**
     * @dev Return null if the account was already initialized
     */
    if (!!(await this.connection.getAccountInfo(lookupTableRegistryAccount))) {
      return null;
    }

    /**
     * @dev Return instruction if we need
     */
    return {
      account: lookupTableRegistryAccount,
      instruction: await this.program.methods
        .initializeAddressLookupTable()
        .accounts({
          lookupTableRegistry: lookupTableRegistryAccount,
          signer: this.program.provider.publicKey,
        })
        .instruction(),
    };
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
  ): Promise<TransactionInstruction[] | null> {
    /**
     * @dev Initializes
     */
    const slot = await this.connection.getSlot({
      commitment: "finalized",
    });
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

      /**
       * @dev Also create lookup table
       */
      const [lookupTableInst, altAddress] =
        AddressLookupTableProgram.createLookupTable({
          authority: walletProvider.publicKey,
          payer: walletProvider.publicKey,
          recentSlot: slot,
        });

      /**
       * @dev Rebind the lookup table address
       */
      lookupTableAddress = altAddress;
      instructions.push(lookupTableInst);
    }

    /**
     * @dev Create lookup table first
     */

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
    if (extendInstruction === null) return null;

    /**
     * @dev Return instructions
     */
    instructions.push(extendInstruction);
    return instructions;
  }

  /**
   * @dev Extend lookup table
   * @param walletProvider
   * @param lookupTableAddress
   * @param accounts
   * @return Returns null if there are no addresses need to be whitelisted,
   * returns instructions if there are addresses need to be whitelisted.
   */
  public async extendLookupTable(
    walletProvider: WalletProvider,
    lookupTableAddress: PublicKey,
    accounts: PublicKey[]
  ): Promise<TransactionInstruction | null> {
    /**
     * @dev Check if lookup table account already existed
     */
    const lookupTableAccount = await this.connection
      .getAddressLookupTable(lookupTableAddress, { commitment: "finalized" })
      .then((res) => res.value);

    /**
     * @dev Check for whitelisted addresses
     */
    const needToWhitelistedAddresses =
      lookupTableAccount === null
        ? accounts
        : accounts.filter(
            (elm) =>
              !lookupTableAccount.state.addresses.find(
                (addr) => addr.equals(elm) === false
              )
          );

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
