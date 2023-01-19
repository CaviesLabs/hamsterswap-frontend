import { networkProvider } from "@/src/providers/network.provider";
import { PlatformConfigDto } from "@/src/entities/platform-config.entity";

export class PlatformConfigService {
  async get(): Promise<PlatformConfigDto> {
    const resp = await networkProvider.request("/platform-config", {});
    return resp as PlatformConfigDto;
  }
}

export const platformConfigService = new PlatformConfigService();
