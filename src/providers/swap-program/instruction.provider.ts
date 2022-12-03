import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { CreateProposalDto } from "@/src/entities/proposal.entity";
import { SwapIdl } from "./swap.idl";

export class InstructionProvider {
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

  /**
   * @dev Swap registry
   * @private
   */
  private readonly swapRegistry: PublicKey;

  constructor(
    connection: Connection,
    program: Program<SwapIdl>,
    swapRegistry: PublicKey
  ) {
    this.connection = connection;
    this.program = program;
    this.swapRegistry = swapRegistry;
  }

  /**
   * @dev The function to find and create token vault.
   * @param {PublicKey} pub.
   * @returns {TransactionInstruction}
   */
  public async createSwapTokenVault(
    pub: PublicKey
  ): Promise<TransactionInstruction> {
    /**
     * @dev Find token vault if exists in chain.
     */
    const [swapTokenVault] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::TOKEN_VAULT_SEED"),
        pub.toBytes(),
      ],
      this.program.programId
    );

    /**
     * @dev If does not find account info of token vault then create new instruction for one.
     */
    if (!(await this.connection.getAccountInfo(swapTokenVault))) {
      return await this.program.methods
        .createTokenVault()
        .accounts({
          mintAccount: pub,
          swapRegistry: this.swapRegistry,
          swapTokenVault,
        })
        .instruction();
    }

    return null;
  }

  /**
   * @dev The function to find swap proposal on-chain with id (have to splice before process).
   * @param {string} pub.
   * @returns {PublicKey}
   */
  public async findSwapProposal(pub: string): Promise<PublicKey> {
    /**
     * @dev Find proposal with id.
     */
    const [swapProposal] = await PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::PROPOSAL_SEED"),
        anchor.utils.bytes.utf8.encode(pub.slice(0, 10)),
      ],
      this.program.programId
    );

    return swapProposal;
  }

  /**
   * @dev The function to create proposal instruction.
   * @param {CreateProposalDto} createProposalDto.
   * @param {PublicKey} proposalOwner.
   * @param {PublicKey} swapProposal.
   * @returns {TransactionInstruction}
   */
  public async createProposal(
    createProposalDto: CreateProposalDto,
    proposalOwner: PublicKey,
    swapProposal: PublicKey
  ): Promise<TransactionInstruction> {
    return await this.program.methods
      .createProposal({
        id: createProposalDto.id.slice(0, 10),
        swapOptions: createProposalDto.swapOptions,
        offeredItems: createProposalDto.offeredOptions,
        expiredAt: new anchor.BN(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 7
        ),
      })
      .accounts({
        proposalOwner,
        swapProposal,
        swapRegistry: this.swapRegistry,
      })
      .instruction();
  }
}
