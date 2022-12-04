import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import { CreateProposalDto } from "@/src/entities/proposal.entity";
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
        this.swapRegistry
      );

      /**
       * @dev Initlize transaction provider.
       */
      this.transactionProvider = new TransactionProvider(this.connection);
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
    const [swapRegistry] = await PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("SEED::SWAP::PLATFORM")],
      this.program.programId
    );

    /**
     * @dev assign to instance.
     */
    this.swapRegistry = swapRegistry;

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
      let swapProposal: PublicKey;
      try {
        /**
         * @dev Find swap program.
         */
        swapProposal = await this.instructionProvider.findSwapProposal(
          createProposalDto.id
        );
      } catch (err: any) {
        console.error("Error when get swap proposal", err.message);
      }

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      const instructions: TransactionInstruction[] = [];

      /**
       * @dev Create token vaults
       */
      createProposalDto.offeredOptions
        .concat(createProposalDto.offeredOptions)
        .map(async (item) => {
          try {
            /**
             * @dev Create token vaults for each swap items.
             */
            const ins = await this.instructionProvider.createSwapTokenVault(
              item.mintAccount
            );

            /**
             * @dev Add to instructions if valid.
             */
            if (ins) {
              instructions.push(ins);
            }
          } catch (err: any) {
            console.error("error when crate token vault", err.message);
          }
        });

      try {
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
        if (createProposalInstruction) {
          instructions.push(createProposalInstruction);
        }
      } catch (err: any) {
        console.log("error when create proposal instruction", err.message);
      }

      /**
       * @dev Now deposit all tokens which user want to wrap in proposal.
       */
      createProposalDto.offeredOptions.map(async (item) => {
        try {
          /**
           * @dev Try to create a instruction to deposit token.
           */
          console.log({
            proposalId: createProposalDto.id,
            swapProposal: swapProposal.toBase58().toString(),
            owner: walletProvider.publicKey.toBase58().toString(),
            mintAccount: item.mintAccount.toBase58().toString(),
            itemId: item.id,
          });
          const ins = await this.instructionProvider.depositToken(
            createProposalDto.id,
            swapProposal,
            walletProvider.publicKey,
            item.mintAccount,
            item.id
          );

          /**
           * @dev Add to instructions if valid.
           */
          if (ins) {
            instructions.push(ins);
            // const tx = await this.transactionProvider.signAndSendTransaction(
            //   walletProvider,
            //   [ins]
            // );
            // console.log(tx);
          }
        } catch (err: any) {
          console.error("Error when deposit tokens", err);
        }
      });

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
          console.log(state);
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
  public async cancleProposal(
    walletProvider: WalletProvider,
    proposalId: string
  ) {
    try {
      let swapProposal: PublicKey;
      try {
        /**
         * @dev Find swap program.
         */
        swapProposal = await this.instructionProvider.findSwapProposal(
          proposalId
        );
      } catch (err: any) {
        console.error("Error when get swap proposal", err.message);
      }

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      const instructions: TransactionInstruction[] = [];
      instructions.push(
        await this.instructionProvider.cancelProposal(
          proposalId,
          swapProposal,
          walletProvider.publicKey
        )
      );

      /**
       * @dev Sign and confirm instructions.
       */
      const txId = await this.transactionProvider.signAndSendTransaction(
        walletProvider,
        instructions
      );

      console.log("Cancel proposal", proposalId.slice(0, 10), { txId });
    } catch {}
  }
}
