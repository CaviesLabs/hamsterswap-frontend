import {
  ERC20,
  ERC20__factory,
  ERC721,
  ERC721__factory,
  HamsterSwap,
  HamsterSwap__factory,
  Multicall3,
  Multicall3__factory,
} from "@/src/providers/evm-program";
import { PlatformConfigDto } from "@/src/entities/platform-config.entity";

export class EvmContractService {
  private multical3Contract: Multicall3;
  private _hamsterContract: HamsterSwap;

  constructor(
    private readonly signer: unknown,
    private readonly platformConfig: PlatformConfigDto
  ) {
    /**
     * @dev Initialize HamsterSwap contract.
     * @private
     */
    this._hamsterContract = HamsterSwap__factory.connect(
      platformConfig.programAddress,
      signer as any
    );

    /**
     * @dev Initialize multicall3 contract.
     * @private
     */
    this.multical3Contract = Multicall3__factory.connect(
      platformConfig.multicall3Address,
      signer as any
    );
  }

  /**
   * @dev Get HamsterSwap contract.
   * @returns {HamsterSwap}
   */
  public get hamsterContract(): HamsterSwap {
    return this._hamsterContract;
  }

  /**
   * @dev Get ERC721 contract.
   * @param {string} address
   * @returns {ERC721}
   */
  public getNftContract(address: string): ERC721 {
    return ERC721__factory.connect(address, this.signer as any);
  }

  /**
   * @dev Get ERC20 contract.
   * @param {string} address
   * @returns {ERC20}
   */
  public getTokenContract(address: string): ERC20 {
    return ERC20__factory.connect(address, this.signer as any);
  }

  /**
   * @dev The function to prepare data to submit proposal on-chain.
   * @param {string} walletAddress
   * @param {string} proposalId
   * @param {any[]} offeredItems
   * @param {any[]} swapOptions
   * @param {bigint} expiredAt
   * @param {bigint} wrapTokenAmount
   * @returns {Promise<any>}
   */
  async submitProposal(
    walletAddress: string,
    proposalId: string,
    offeredItems: any[],
    swapOptions: any[],
    expiredAt: bigint,
    wrapTokenAmount: bigint
  ) {
    const tx = await this.multical3Contract.aggregate3Value(
      [
        ...(wrapTokenAmount
          ? [
              {
                target: await this.hamsterContract.getAddress(),
                callData: this.hamsterContract.interface.encodeFunctionData(
                  "wrapETH",
                  [walletAddress, wrapTokenAmount]
                ),
                value: wrapTokenAmount,
                allowFailure: false,
              },
            ]
          : []),
        {
          target: await this.hamsterContract.getAddress(),
          callData: this.hamsterContract.interface.encodeFunctionData(
            "createProposal",
            [proposalId, walletAddress, offeredItems, swapOptions, expiredAt]
          ),
          value: 0,
          allowFailure: false,
        },
      ],
      wrapTokenAmount ? { value: wrapTokenAmount } : {}
    );

    // TODO: Adjust for other blockchain later.
    await tx.wait(5);
    return tx;
  }

  /**
   * @dev The function to prepare data to cancel proposal on-chain.
   * @param {string} proposalId
   * @returns {Promise<any>}
   */
  public async cancelProposal(proposalId: string) {
    const tx = await this.hamsterContract.cancelProposal(proposalId);
    await tx.wait(5);
    return tx;
  }

  /**
   * @dev The function to prepare data to swap proposal on-chain.
   * @param {string} proposalId
   * @param {string} optionId
   * @returns {Promise<any>}
   */
  public async fullFillProposal(
    walletAddress: string,
    proposalId: string,
    optionId: string,
    wrapTokenAmount: bigint,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    wrapRecipientTokenAmount?: bigint
  ) {
    const tx = await this.multical3Contract.aggregate3Value(
      [
        ...(wrapTokenAmount
          ? [
              {
                target: await this.hamsterContract.getAddress(),
                callData: this.hamsterContract.interface.encodeFunctionData(
                  "wrapETH",
                  [walletAddress, wrapTokenAmount]
                ),
                value: wrapTokenAmount,
                allowFailure: false,
              },
            ]
          : []),
        {
          target: await this.hamsterContract.getAddress(),
          callData: this.hamsterContract.interface.encodeFunctionData(
            "fulfillProposal",
            [proposalId, optionId, walletAddress]
          ),
          value: 0,
          allowFailure: false,
        },
        // ...(wrapRecipientTokenAmount && [
        //   {
        //     target: await this.hamsterContract.getAddress(),
        //     callData: this.hamsterContract.interface.encodeFunctionData(
        //       "unwrapETH",
        //       [walletAddress]
        //     ),
        //     value: 0,
        //     allowFailure: false,
        //   },
        // ]),
      ],
      wrapTokenAmount ? { value: wrapTokenAmount } : {}
    );
    tx.wait(5);
    return tx;
  }
}

export const getEvmContractService = (
  signer: unknown,
  platformConfig: PlatformConfigDto
) => new EvmContractService(signer, platformConfig);
