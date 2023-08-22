import {
  // ERC20,
  // ERC20__factory,
  // ERC721,
  // ERC721__factory,
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
    this._hamsterContract = HamsterSwap__factory.connect(
      platformConfig.programAddress,
      signer as any
    );

    this.multical3Contract = Multicall3__factory.connect(
      platformConfig.multicall3Address,
      signer as any
    );
  }

  public get hamsterContract(): HamsterSwap {
    return this._hamsterContract;
  }

  async submitProposal(
    walletAddress: string,
    proposalId: string,
    offeredItems: any[],
    swapOptions: any[],
    expiredAt: bigint,
    wrapTokenAmount: bigint
  ) {
    console.log({ multical3Contract: this.multical3Contract });
    console.log({
      walletAddress,
      proposalId,
      offeredItems,
      swapOptions,
      expiredAt,
      wrapTokenAmount,
    });
    console.log({ programAddress: await this.hamsterContract.getAddress() });

    return await this.multical3Contract.aggregate3Value([
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
    ]);
  }
}

export const getEvmContractService = (
  signer: unknown,
  platformConfig: PlatformConfigDto
) => new EvmContractService(signer, platformConfig);
