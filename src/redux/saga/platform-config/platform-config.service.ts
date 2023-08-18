import { networkProvider } from "@/src/providers/network.provider";
import {
  PlatformConfigDto,
  PlatformConfigDtoV2,
} from "@/src/entities/platform-config.entity";
import { ChainId } from "@/src/entities/chain.entity";
import { WSOL_ADDRESS } from "@/src/utils/constants";
import { Keypair } from "@solana/web3.js";

export class PlatformConfigService {
  /**
   * @dev The function to get platform config.
   * @param {ChainId} chainId.
   * @notice Correct entity to bridge solana.
   * @returns {Promise<PlatformConfigDto>}
   * @see src/entities/platform-config.entity.ts
   */
  async get(chainId: ChainId): Promise<PlatformConfigDto> {
    const v2PlatformConfig = await networkProvider.request<PlatformConfigDtoV2>(
      "/evm/platform-config",
      {}
    );

    return {
      maxAllowedItems: v2PlatformConfig[chainId].maxAllowedItems,
      maxAllowedOptions: v2PlatformConfig[chainId].maxAllowedOptions,
      allowNTFCollections: v2PlatformConfig[chainId].collections,
      allowCurrencies: v2PlatformConfig[chainId].currencies.map((item) => ({
        ...item,
        realAddress: item.address,
        address: item.isNativeToken
          ? WSOL_ADDRESS
          : Keypair.generate().publicKey.toString(),
      })),
    };
  }
}

export const platformConfigService = new PlatformConfigService();
