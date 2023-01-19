import { AddressLookupTableProgram, Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { Program } from "@project-serum/anchor";
import { SwapIdl } from "@/src/providers/program/swap.idl";

export class LookupTableProvider {
  /**
   * @dev Constructor that initializes address lookup table provider
   * @param connection
   * @param program
   */
  constructor(
    private readonly connection: Connection,
    private readonly program: Program<SwapIdl>
  ){}

  /**
   * @dev Extend lookup table
   * @param walletProvider
   * @param accounts
   * @return Returns null if there are no addresses need to be whitelisted,
   * returns instructions if there are addresses need to be whitelisted.
   */
  public async createAndExtendLookupTable(
    walletProvider: WalletProvider,
    accounts: PublicKey[]
  ): Promise<TransactionInstruction[] | null> {
    const instructions: TransactionInstruction[] = [];

    /**
     * @dev Create lookup table first
     */
    const [lookupTableInst, lookupTableAddress] =
      AddressLookupTableProgram.createLookupTable({
        authority: walletProvider.publicKey,
        payer: walletProvider.publicKey,
        recentSlot: await this.connection.getSlot({
          commitment: "finalized"
        })
      });
    instructions.push(lookupTableInst);

    /**
     * @dev Extend instruction
     */
    const extendInstruction = await this.extendLookupTable(walletProvider, lookupTableAddress, accounts);

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
    const needToWhitelistedAddresses = lookupTableAccount === null ? accounts : accounts.filter(elm =>
      !lookupTableAccount.state.addresses.find(addr => addr.equals(elm) === false)
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
        addresses: needToWhitelistedAddresses
      });
    }

    /**
     * @dev Return null if there are no addresses need to be whitelisted
     */
    return null;
  }
}