/* eslint-disable @typescript-eslint/no-unused-vars */
import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { WalletContextState as WalletProvider } from "@solana/wallet-adapter-react";
import {
  CreateProposalDto,
  SwapItemActionType,
  SwapProposalEntity,
  SwapItemStatus,
  SwapProposalStatus,
  SwapItemType,
  AssetTypes,
} from "@/src/entities/proposal.entity";
import { SwapIdl, IDL } from "./swap.idl";
import { InstructionProvider } from "./instruction.provider";
import { TransactionProvider } from "./transaction.provider";
import { WSOL_ADDRESS } from "@/src/utils/constants";
import { LookupTableProvider } from "./lookup-table.provider";

export const SOLANA_DEVNET_RPC_ENDPOINT = "https://api.devnet.solana.com";
export const SOLANA_MAINNET_RPC_RPC_ENDPOINT =
  "https://boldest-few-field.solana-mainnet.quiknode.pro/0ffa9f9f5e9141aa33a030081b78fdfe40bfbae6/";

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
  private lookupTableProvider: LookupTableProvider;

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
      case "mainnet-beta":
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
       * @dev Initilize lookup table provider
       */
      this.lookupTableProvider = new LookupTableProvider(
        this.connection,
        this.program
      );

      /**
       * @dev Initlize transaction provider.
       */
      this.transactionProvider = new TransactionProvider(
        this.connection,
        this.program,
        this.lookupTableProvider
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
    this.connection = new Connection(this.rpcEndpoint, "finalized");
    const provider = new anchor.AnchorProvider(
      this.connection,
      this.walletProvider,
      {
        preflightCommitment: "finalized",
        commitment: "finalized",
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
   * @param walletProvider
   * @param {CreateProposalDto} createProposalDto.
   * @returns {any}.
   */
  public async createProposal(
    walletProvider: WalletProvider,
    createProposalDto: CreateProposalDto
  ) {
    try {
      console.log(createProposalDto.id);
      /**
       * @dev Find swap program.
       */
      const swapProposal = await this.instructionProvider.findSwapProposal(
        createProposalDto.id
      );

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      let instructions: TransactionInstruction[] = [];

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
      if (createProposalInstruction) {
        instructions.push(createProposalInstruction);
      }

      /**
       * @dev Now deposit all tokens which user want to wrap in proposal.
       */
      await Promise.all(
        createProposalDto.offeredOptions.map(async (item) => {
          /**
           * @dev Instruction to create associated token account if doest exists.
           */
          const associatedInstruction =
            await this.instructionProvider.getOrCreateProposalTokenAccount(
              walletProvider.publicKey,
              item.mintAccount
            );

          /**
           * @dev Add to arrays to process if valid.
           */
          if (associatedInstruction) {
            instructions.push(associatedInstruction);
          }

          /**
           * @dev Handle to wrap sol to wsol if offered item is SOL currency.
           */
          const wrapSolInstructions = [];
          console.log(item.mintAccount.toBase58().toString(), WSOL_ADDRESS);
          if (
            Object.keys(item.itemType)[0] === AssetTypes.token &&
            item.mintAccount.toBase58().toString() === WSOL_ADDRESS
          ) {
            try {
              const [ins1, ins2] = await this.instructionProvider.wrapSol(
                walletProvider.publicKey,
                item.amount
              );

              ins1 && wrapSolInstructions.push(ins1);
              ins2 && wrapSolInstructions.push(ins2);
            } catch (err) {
              console.log("Error when wrap sol", err);
            }
          }

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
          if (!ins) return;
          instructions = [...instructions, ...wrapSolInstructions, ins];
        })
      );

      /**
       * @dev Sign and confirm instructions.
       */
      const txId = await this.transactionProvider.signAndSendTransaction(
        walletProvider,
        instructions
      );

      console.log("Transaction ID: ", { txId });
      setTimeout(async () => {
        const [, state] = await this.getProposalState(createProposalDto.id);
        console.log({ state });
      }, 4000);
    } catch (err: any) {
      console.error("Error", err.message);
      throw err;
    }
  }

  /**
   * @dev The function to cancle proposal on-chain.
   * @param walletProvider
   * @param proposal
   * @param optionId
   */
  public async cancelProposal(
    walletProvider: WalletProvider,
    proposal: SwapProposalEntity,
    optionId?: string
  ) {
    /**
     * @dev Find swap program.
     */
    console.log(proposal.id);
    const [swapProposal, state] = await this.getProposalState(proposal.id);

    /**
     * @dev Define @var {TransactionInstruction} @arrays instructions to process.
     */
    const instructions: TransactionInstruction[] = [];

    /**
     * Check if not cancel
     * @dev Canceling instruction.
     */
    if (state.status.valueOf() !== SwapItemStatus.CANCELED.valueOf()) {
      instructions.push(
        await this.instructionProvider.cancelProposal(
          proposal.id,
          swapProposal,
          walletProvider.publicKey
        )
      );
    }

    /**
     * @dev
     * Check if signer is proposal owner will withdraw offered items to siger
     * else will withdraw swap option to siger.
     */
    const widthDrawItems =
      proposal.ownerAddress === walletProvider?.publicKey?.toBase58().toString()
        ? proposal.offerItems
        : proposal.swapOptions.find((item) => item.id === optionId)?.items;

    console.log(proposal);
    console.log(widthDrawItems);

    /**
     * @dev Create each instruction to withdraw nft to signer.
     */
    if (widthDrawItems?.length) {
      await Promise.all(
        widthDrawItems.map(async (item) => {
          /**
           * @dev Initilize instruction to withdraw tokens from vault account to proposal owner.
           */
          const instruction =
            await this.instructionProvider.transferTokenFromVault(
              walletProvider.publicKey,
              new PublicKey(item.contractAddress),
              swapProposal,
              proposal.id,
              item.id,
              SwapItemActionType.withdrawing
            );

          /**
           * @dev And instruction to list to process if its valid.
           */
          if (!instruction) return;
          instructions.push(instruction);

          /** @dev Unwrap sol if item is currency. */
          if (
            item.type === SwapItemType.CURRENCY &&
            item.contractAddress === WSOL_ADDRESS
          ) {
            const inst = await this.instructionProvider.unwrapSol(
              walletProvider.publicKey
            );

            /** @dev Add if valid */
            instructions.push(inst);
          }
        })
      );
    }

    /**
     * @dev Sign and confirm instructions.
     */
    const txId = await this.transactionProvider.signAndSendTransaction(
      walletProvider,
      instructions
    );

    console.log("Cancel proposal", proposal.id.slice(0, 10), { txId });
  }

  /**
   * @dev Call the function to process transaction to wrap a proposal.
   * @param {WalletProvider} walletProvider
   * @param proposal
   * @param {string} optionId.
   */
  public async swapProposal(
    walletProvider: WalletProvider,
    proposal: SwapProposalEntity,
    optionId: string
  ) {
    try {
      /**
       * @dev Find swap program.
       */
      const [swapProposal] = await this.getProposalState(proposal.id);

      /**
       * @dev Define @var {TransactionInstruction} @arrays instructions to process.
       */
      let instructions: TransactionInstruction[] = [];

      /**
       * @dev Filter swap items by option id.
       */
      const swapOption = proposal.swapOptions.find(
        (item) => item.id === optionId
      );

      await Promise.all(
        swapOption.items.map(async (item) => {
          /**
           * @dev Instruction to create associated token account if doest exists.
           */
          const associatedInstruction =
            await this.instructionProvider.getOrCreateProposalTokenAccount(
              walletProvider.publicKey,
              new PublicKey(item.contractAddress)
            );

          /**
           * @dev Add to arrays to process if valid.
           */
          console.log("associatedInstruction 1", associatedInstruction);
          if (associatedInstruction) {
            instructions.push(associatedInstruction);
          }

          /**
           * @dev Handle to wrap sol to wsol if offered item is SOL currency.
           */
          const wrapSolInstructions = [];
          if (
            item.type.valueOf() === SwapItemType.CURRENCY.valueOf() &&
            item.contractAddress === WSOL_ADDRESS
          ) {
            try {
              const [ins1, ins2] = await this.instructionProvider.wrapSol(
                walletProvider.publicKey,
                new anchor.BN(item.amount)
              );

              ins1 && wrapSolInstructions.push(ins1);
              ins2 && wrapSolInstructions.push(ins2);
            } catch (err) {
              console.log("Error when wrap sol", err);
            }
          }

          /**
           * @dev Fullfiling deposit token from buyer to token vault.
           */
          const instruction =
            await this.instructionProvider.transferTokenToVault(
              proposal.id,
              swapProposal,
              walletProvider.publicKey,
              new PublicKey(item.contractAddress),
              item.id,
              SwapItemActionType.fulfilling,
              optionId
            );

          if (!instruction) return;
          instructions = [...instructions, ...wrapSolInstructions, instruction];
        })
      );

      await Promise.all(
        proposal.offerItems.map(async (item) => {
          /**
           * @dev If offer items is not exist in swap option,
           * it mean the signer not already created associated token before, then create one.
           */
          if (
            !swapOption.items.find(
              (swapItem) => swapItem.contractAddress === item.contractAddress
            )
          ) {
            console.log("created in depositing swap item");
            /**
             * @dev Instruction to create associated token account if doest exists.
             */
            const associatedInstruction =
              await this.instructionProvider.getOrCreateProposalTokenAccount(
                walletProvider.publicKey,
                new PublicKey(item.contractAddress)
              );

            /**
             * @dev Add to arrays to process if valid.
             */
            if (associatedInstruction) {
              instructions.push(associatedInstruction);
            }
          }

          /**
           * @dev Fullfiling deposit token from buyer to token vault.
           */
          const instruction =
            await this.instructionProvider.transferTokenFromVault(
              walletProvider.publicKey,
              new PublicKey(item.contractAddress),
              swapProposal,
              proposal.id,
              item.id,
              SwapItemActionType.redeeming
            );

          /**
           * @dev Add to process if valid.
           */
          if (!instruction) return;
          instructions.push(instruction);

          /** @dev Unwrap sol if item is currency. */
          if (
            item.type === SwapItemType.CURRENCY &&
            item.contractAddress === WSOL_ADDRESS
          ) {
            const inst = await this.instructionProvider.unwrapSol(
              walletProvider.publicKey
            );

            /** @dev Add if valid */
            instructions.push(inst);
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

      console.log("Wrap proposal successfully", proposal.id.slice(0, 10), {
        txId,
      });
    } catch (err: any) {
      console.error("Error when wrap proposal", err);
      throw Error(err);
    }
  }

  /**
   * @dev Claim nft in proposal if its status is redeem.
   * @param {WalletProvider} walletProvider
   * @param {SwapProposalEntity} proposal
   */
  public async redeemProposal(
    walletProvider: WalletProvider,
    proposal: SwapProposalEntity
  ) {
    /**
     * @dev Find swap program.
     */
    const [swapProposal, state] = await this.getProposalState(proposal.id);

    /**
     * @dev Check if signer is not proposal owner.
     */
    if (state.owner !== walletProvider?.publicKey?.toBase58().toString()) {
      throw new Error("Signer is not proposal owner.");
    }

    /**
     * @dev Check status of proposal.
     */
    if (
      proposal.status.valueOf() !== SwapProposalStatus.FULFILLED.valueOf() &&
      proposal.status.valueOf() !== SwapProposalStatus.SWAPPED.valueOf()
    ) {
      throw new Error("Proposal's status is not fulfied!");
    }

    /**
     * @dev Define @var {TransactionInstruction} @arrays instructions to process.
     */
    const instructions: TransactionInstruction[] = [];
    const swapOption = proposal.swapOptions.find(
      (item) => item.id === proposal.fulfilledWithOptionId
    );

    /**
     * @dev Transfer all items included in swap option to owner.
     */
    await Promise.all(
      swapOption.items.map(async (item) => {
        /**
         * @dev Instruction to create associated token account if doest exists.
         */
        const associatedInstruction =
          await this.instructionProvider.getOrCreateProposalTokenAccount(
            walletProvider.publicKey,
            new PublicKey(item.contractAddress)
          );

        /**
         * @dev Add to arrays to process if valid.
         */
        if (associatedInstruction) {
          instructions.push(associatedInstruction);
        }

        /**
         * @dev Fullfiling deposit token from buyer to token vault.
         */
        const instruction =
          await this.instructionProvider.transferTokenFromVault(
            new PublicKey(proposal.ownerAddress),
            new PublicKey(item.contractAddress),
            swapProposal,
            proposal.id,
            item.id,
            SwapItemActionType.redeeming
          );
        if (!instruction) return;
        instructions.push(instruction);

        /** @dev Unwrap sol if item is currency. */
        if (
          item.type === SwapItemType.CURRENCY &&
          item.contractAddress === WSOL_ADDRESS
        ) {
          const inst = await this.instructionProvider.unwrapSol(
            walletProvider.publicKey
          );

          /** @dev Add if valid */
          instructions.push(inst);
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

    console.log("Claim proposal successfully!", proposal.id, {
      txId,
    });

    console.log(
      "Proposal state: ",
      (await this.getProposalState(proposal.id))[1]
    );
  }

  /**
   * @dev Get proposal ID
   * @param {string} id Proposal ID.
   */
  private async getProposalState(
    id: string
  ): Promise<[PublicKey, SwapProposalEntity]> {
    const swapProposal = await this.instructionProvider.findSwapProposal(id);
    const state = await this.program.account.swapProposal.fetch(swapProposal);
    const parseState = JSON.parse(JSON.stringify(state)) as SwapProposalEntity;
    return [swapProposal, parseState];
  }
}
