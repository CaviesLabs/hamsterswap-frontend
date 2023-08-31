import { JsonRpcProvider } from "ethers";
import {
  ChainEntity,
  ChainId,
  DEFAULT_CHAINS,
} from "@/src/entities/chain.entity";

/**
 * @notice ReadonlyEthersProvider represents a readonly ethers provider. Used for making RPC calls to the blockchain.
 * @property {chainEntity} The chain entity.
 * @property {provider} The provider.
 * @method {create} A static method to create a new instance of ReadonlyEthersProvider.
 * @method {provider} Get the provider.
 */
export class ReadonlyEthersProvider {
  private readonly _chainEntity: ChainEntity;
  private _provider: JsonRpcProvider;

  /**
   * @notice Create a new instance of ReadonlyEthersProvider.
   * @param chainKey
   */
  constructor(private readonly chainId: ChainId) {
    this._chainEntity = DEFAULT_CHAINS.find(
      (chain) => chain.chainId === chainId
    );

    if (!this._chainEntity) {
      throw new Error(`CHAIN_ID_NOT_FOUND: ${chainId}`);
    }
  }

  /**
   * @notice Create a new instance of ReadonlyEthersProvider.
   * @param chainId
   */
  public static create(chainId: ChainId): ReadonlyEthersProvider | null {
    try {
      return new ReadonlyEthersProvider(chainId);
    } catch {
      return null;
    }
  }

  /**
   * @notice Get the provider.
   */
  public get provider(): JsonRpcProvider {
    if (!this._provider) {
      this._provider = new JsonRpcProvider(this._chainEntity.rpcUrl);
    }

    return this._provider;
  }

  /**
   * @notice Get the chain entity.
   */
  public get chainEntity(): ChainEntity {
    return this._chainEntity;
  }
}
