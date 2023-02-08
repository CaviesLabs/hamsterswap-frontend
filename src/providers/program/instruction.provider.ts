import { Program } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor";
import {
  Connection,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";
import {
  CreateProposalDto,
  SwapItemActionType,
} from "@/src/entities/proposal.entity";
import {
  getAssociatedTokenAddress,
  createSyncNativeInstruction,
  createCloseAccountInstruction,
  NATIVE_MINT,
} from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from "./getOrCreateAssociatedTokenAccount";
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
  private readonly swapRegistryBump: number;

  constructor(
    connection: Connection,
    program: Program<SwapIdl>,
    swapRegistry: PublicKey,
    swapRegistryBump: number
  ) {
    this.connection = connection;
    this.program = program;
    this.swapRegistry = swapRegistry;
    this.swapRegistryBump = swapRegistryBump;
  }

  /**
   * @dev Find token vault if exists in chain.
   * @param {PublicKey} pub.
   */
  private findTokenVaultAccount(pub: PublicKey): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::TOKEN_VAULT_SEED"),
        pub.toBytes(),
      ],
      this.program.programId
    );
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
    const [swapTokenVault] = this.findTokenVaultAccount(pub);

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
    const [swapProposal] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::PROPOSAL_SEED"),
        anchor.utils.bytes.utf8.encode(pub.slice(0, 10)),
      ],
      this.program.programId
    );

    return swapProposal;
  }

  /**
   * @dev The function to get or create a account to hold token.
   * @param publicKey
   * @param {PublicKey} mintAccount
   * @returns {PublicKey}
   */
  public async getOrCreateProposalTokenAccount(
    publicKey: PublicKey,
    mintAccount: PublicKey
  ): Promise<TransactionInstruction> {
    return getOrCreateAssociatedTokenAccount(
      this.connection,
      { publicKey } as any,
      mintAccount,
      publicKey
    );
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
        expiredAt: new anchor.BN(createProposalDto.expiredAt.getTime()),
      })
      .accounts({
        proposalOwner,
        swapProposal,
        swapRegistry: this.swapRegistry,
      })
      .instruction();
  }

  /**
   * @dev the functioon to cancel proposal instruction.
   * @param {string} proposalId
   * @param {PublicKey} swapProposal
   * @param {PublicKey} proposalOwner
   * @returns {TransactionInstruction}
   */
  public async cancelProposal(
    proposalId: string,
    swapProposal: PublicKey,
    proposalOwner: PublicKey
  ): Promise<TransactionInstruction> {
    return await this.program.methods
      .cancelProposal({ id: proposalId.slice(0, 10) })
      .accounts({
        swapProposal,
        signer: proposalOwner,
      })
      .instruction();
  }

  /**
   * @dev The function to deposit token to token vault account.
   * @param {PublicKey} proposalOwner
   * @param {PublicKey} mintAccount
   * @param {string} proposalId
   * @param swapProposal
   * @param {PublicKey} swapItemId
   * @param actionType
   * @param optionId
   * @returns
   */
  public async transferTokenToVault(
    proposalId: string,
    swapProposal: PublicKey,
    proposalOwner: PublicKey,
    mintAccount: PublicKey,
    swapItemId: string,
    actionType: SwapItemActionType,
    optionId?: string
  ): Promise<TransactionInstruction> {
    /**
     * @dev Find token vault if exists in chain.
     */
    const [swapTokenVault, swapTokenVaultBump] =
      await this.findTokenVaultAccount(mintAccount);

    /**
     * @dev Get @var {asociatedTokenAccount} to hold mintAccount.
     */
    const asociatedTokenAccountAddress = await getAssociatedTokenAddress(
      mintAccount,
      proposalOwner
    );

    /**
     * @dev Initilize params for program.
     */
    const params: any = {
      proposalId: proposalId.slice(0, 10),
      swapItemId: swapItemId.slice(0, 10),
      swapTokenVaultBump,
      actionType: { [actionType]: {} },
      optionId: optionId ? optionId.slice(0, 10) : "",
    };

    console.log(params);

    /**
     * @dev Call to program to create an instruction.
     */
    return await this.program.methods
      .transferAssetsToVault(params)
      .accounts({
        signer: proposalOwner,
        signerTokenAccount: asociatedTokenAccountAddress,
        swapTokenVault,
        mintAccount,
        swapProposal,
      })
      .instruction();
  }

  /**
   * @dev The function to transfer token from vault to target account.
   * @param targetAccount
   * @param mintAccount
   * @param swapProposal
   * @param proposalId
   * @param swapItemId
   * @param actionType
   * @returns {TransactionInstruction}
   */
  public async transferTokenFromVault(
    targetAccount: PublicKey,
    mintAccount: PublicKey,
    swapProposal: PublicKey,
    proposalId: string,
    swapItemId: string,
    actionType: SwapItemActionType
  ): Promise<TransactionInstruction> {
    /**
     * @dev Find token vault if exists in chain.
     */
    const [swapTokenVault, swapTokenVaultBump] =
      await this.findTokenVaultAccount(mintAccount);

    /**
     * @dev Get @var {asociatedTokenAccount} to hold mintAccount.
     */
    const asociatedTokenAccountAddress = await getAssociatedTokenAddress(
      mintAccount,
      targetAccount
    );

    /**
     * @dev Initilize params for program.
     */
    const params: any = {
      proposalId: proposalId.slice(0, 10),
      swapItemId: swapItemId.slice(0, 10),
      swapRegistryBump: this.swapRegistryBump,
      swapTokenVaultBump,
      actionType: { [actionType]: {} },
    };

    /**
     * @dev Call to program to create an instruction.
     */
    return this.program.methods
      .transferAssetsFromVault(params)
      .accounts({
        signer: targetAccount,
        signerTokenAccount: asociatedTokenAccountAddress,
        swapProposal,
        swapTokenVault,
        swapRegistry: this.swapRegistry,
        mintAccount: mintAccount,
      })
      .instruction();
  }

  /**
   * @dev Wrap SOL to wSOL before deposit.
   * @param {PublicKey} walletPublicKey
   * @param {BN} amount
   * @returns @arrays {[TransactionInstruction, TransactionInstruction]}
   */
  public async wrapSol(
    walletPublicKey: PublicKey,
    amount: anchor.BN
  ): Promise<[TransactionInstruction, TransactionInstruction]> {
    /**
     * @dev Get token account of wSOL.
     */
    const associatedTokenAccount = await getAssociatedTokenAddress(
      NATIVE_MINT,
      walletPublicKey
    );

    /**
     * @dev Transfer sol to wsol account.
     */
    const instruction1 = SystemProgram.transfer({
      fromPubkey: walletPublicKey,
      toPubkey: associatedTokenAccount,
      lamports: amount.toNumber(),
    });

    /**
     * @dev Create native sol.
     */
    const instruction2 = createSyncNativeInstruction(associatedTokenAccount);

    return [instruction1, instruction2];
  }

  /**
   * @dev Unwrap wSOL to sol instruction.
   * @param {PublicKey} walletPublicKey
   * @returns {TransactionInstruction}.
   */
  public async unwrapSol(
    walletPublicKey: PublicKey
  ): Promise<TransactionInstruction> {
    /**
     * @dev Get token account of wSOL.
     */
    const associatedTokenAccount = await getAssociatedTokenAddress(
      NATIVE_MINT,
      walletPublicKey
    );

    return createCloseAccountInstruction(
      associatedTokenAccount,
      walletPublicKey,
      walletPublicKey
    );
  }
}
