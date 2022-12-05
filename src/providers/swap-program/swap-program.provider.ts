import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import {
  CreateProposalDto,
  SwapItemActionType,
  SwapProposalEntity,
} from "@/src/entities/proposal.entity";
import { SwapIdl, IDL } from "./swap.idl";
import { InstructionProvider } from "./instruction.provider";
import { TransactionProvider } from "./transaction.provider";

export const SOLANA_DEVNET_RPC_ENDPOINT = "https://api.devnet.solana.com";
export const SOLANA_MAINNET_RPC_RPC_ENDPOINT =
  "https://api.mainnet-beta.solana.com";

/**
 * @dev Swap Program Provider acts as an interface to interact with hamsterswap program on solana.
 */
export class SwapProgramProvider {
  private readonly idl: SwapIdl = IDL;
  private readonly rpcEndpoint: string;
  private readonly programId: string;
  private readonly walletProvider: WalletProvider;
  private connection: Connection;

  /**
   * @dev This is to indicate whether the program is initialized or not.
   * @private
   */
  private program: Program<SwapIdl>;
  private swapRegistry: PublicKey;
  private swapRegistryBump: number;
  private isProgramInitialize = false;

  /**
   * @dev Provider to create instructions.
   * @private
   */
  private instructionProvider: InstructionProvider;

  /**
   * @dev Provider to process transactions.
   * @private
   */
  private transactionProvider: TransactionProvider;

  /**
   * @dev Initialize swap program provider.
   */
  constructor(walletProvider: WalletProvider) {
    /**
     * @dev Initilize wallet provider context.
     */
    this.walletProvider = walletProvider;

    /**
     * @dev Binding cluster
     */
    switch (process.env.SOLANA_CLUSTER) {
      case "devnet":
        this.rpcEndpoint = SOLANA_DEVNET_RPC_ENDPOINT;
        break;
      case "mainnet":
        this.rpcEndpoint = SOLANA_MAINNET_RPC_RPC_ENDPOINT;
        break;
      default:
        throw new Error("RPC not supported");
    }

    /**
     * @dev Binding program id
     */
    this.programId = process.env.SWAP_PROGRAM_ADDRESS;

    /**
     * @dev Initialize program
     */
    this.getSwapProgram().then((program) => {
      this.program = program;
      this.isProgramInitialize = true;

      /**
       * @dev Initialize instruction provider.
       */
      this.instructionProvider = new InstructionProvider(
        this.connection,
        this.program,
        this.swapRegistry,
        this.swapRegistryBump
      );

      /**
       * @dev Initlize transaction provider.
       */
      this.transactionProvider = new TransactionProvider(
        this.connection,
        this.program
      );
    });
  }

  /**
   * @dev Initialize program
   * @private
   */
  private async getSwapProgram() {
    /**
     * @dev Skip initialization if the program was initialized.
     */
    if (this.program) {
      return this.program;
    }

    /**
     * @dev Prepares for some infra config
     */
    this.connection = new Connection(this.rpcEndpoint, "processed");
    const provider = new anchor.AnchorProvider(
      this.connection,
      this.walletProvider,
      {
        preflightCommitment: "processed",
        commitment: "processed",
      }
    );

    /**
     * @dev Now we create program instance
     */
    this.program = new Program<SwapIdl>(this.idl, this.programId, provider);

    /**
     * @dev Now find swap account.
     */
    const [swapRegistry, swapRegistryBump] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("SEED::SWAP::PLATFORM")],
      this.program.programId
    );

    /**
     * @dev assign to instance.
     */
    this.swapRegistry = swapRegistry;
    this.swapRegistryBump = swapRegistryBump;

    /**
     * @dev Return the program again.
     */
    return this.program;
  }

  /**
   * @dev Return swap proposal with proposal id
   * @param proposalId
   */
  public async getSwapProposal(proposalId: string) {
    const program = await this.getSwapProgram();
    const [swapProposalPublicKey] = PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("SEED::SWAP::PROPOSAL_SEED"),
        anchor.utils.bytes.utf8.encode(proposalId),
      ],
      program.programId
    );

    return program.account.swapProposal.fetch(swapProposalPublicKey);
  }

  /**
   * @dev Return the swap registry.
   */
  public async getSwapConfig() {
    const program = await this.getSwapProgram();

    // find the swap account
    const [swapAccountPublicKey] = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("SEED::SWAP::PLATFORM")],
      program.programId
    );

    return program.account.swapPlatformRegistry.fetch(swapAccountPublicKey);
  }

  /**
   * @dev The function to interact with blockchain to create new on-chain proposal.
   * @param {CreateProposalDto} createProposalDto.
   * @returns {any}.
   */
  public async createProposal(
    walletProvider: WalletProvider,
    createProposalDto: CreateProposalDto
  ) {
    try {
      /**
       * @dev Find swap program.
       */
      const swapProposal = await this.instructionProvider.findSwapProposal(
        createProposalDto.id
      );

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      const instructions: TransactionInstruction[] = [];

      /**
       * @dev Create token vaults
       */
      const swapItems = createProposalDto.offeredOptions.concat(
        createProposalDto.swapOptions.map((item) => item.askingItems).flat(1)
      );
      await Promise.all(
        swapItems.map(async (item) => {
          /**
           * @dev Create token vaults for each swap items.
           */
          const ins = await this.instructionProvider.createSwapTokenVault(
            item.mintAccount
          );

          /**
           * @dev Add to instructions if valid.
           */
          if (!ins) return;
          instructions.push(ins);
        })
      );

      /**
       * @dev Call function to create proposal instruction.
       */
      const createProposalInstruction =
        await this.instructionProvider.createProposal(
          createProposalDto,
          walletProvider.publicKey,
          swapProposal
        );

      /**
       * @dev Add instruction to arrays to process if valid.
       */
      if (!createProposalInstruction) {
        instructions.push(createProposalInstruction);
      }

      /**
       * @dev Now deposit all tokens which user want to wrap in proposal.
       */
      await Promise.all(
        createProposalDto.offeredOptions.map(async (item) => {
          try {
            /**
             * @dev Try to create a instruction to deposit token.
             */
            const ins = await this.instructionProvider.transferTokenToVault(
              createProposalDto.id,
              swapProposal,
              walletProvider.publicKey,
              item.mintAccount,
              item.id,
              SwapItemActionType.depositing
            );

            /**
             * @dev Add to instructions if valid.
             */
            if (ins) {
              instructions.push(ins);
            }
          } catch (err: any) {
            console.error("Error when deposit tokens", err);
          }
        })
      );

      /**
       * @dev Sign and confirm instructions.
       */
      const txId = await this.transactionProvider.signAndSendTransaction(
        walletProvider,
        instructions
      );

      console.log({ txId });

      setTimeout(async () => {
        try {
          const state = await this.program.account.swapProposal.fetch(
            swapProposal
          );
          console.log({ state });
        } catch (err: any) {
          console.error("Error when get proposal state", err.message);
        }
      }, 2000);
    } catch (err: any) {
      console.error("Error", err.message);
    }
  }

  /**
   * @dev The function to cancle proposal on-chain.
   * @param {string} proposalId
   */
  public async cancelProposal(
    walletProvider: WalletProvider,
    proposal: SwapProposalEntity
  ) {
    try {
      /**
       * @dev Find swap program.
       */
      const swapProposal = await this.instructionProvider.findSwapProposal(
        proposal.id
      );

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      const instructions: TransactionInstruction[] = [];

      /**
       * @dev Canceling instruction.
       */
      instructions.push(
        await this.instructionProvider.cancelProposal(
          proposal.id,
          swapProposal,
          walletProvider.publicKey
        )
      );

      await Promise.all(
        proposal.offerItems.map(async (item) => {
          /**
           * @dev Initilize instruction to withdraw tokens from vault account to proposal owner.
           */
          const instruction =
            await this.instructionProvider.transferTokenFromVault(
              walletProvider.publicKey,
              new PublicKey(item.contractAddress),
              swapProposal,
              proposal.id,
              item.status,
              SwapItemActionType.withdrawing
            );

          /**
           * @dev And instruction to list to process if its valid.
           */
          if (instruction) {
            instructions.push(instruction);
          }
        })
      );

      /**
       * @dev Sign and confirm instructions.
       */
      const txId = await this.transactionProvider.signAndSendTransaction(
        walletProvider,
        instructions
      );

      console.log("Cancel proposal", proposal.id.slice(0, 10), { txId });
    } catch {}
  }
}
