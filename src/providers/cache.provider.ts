import { StorageProvider } from "@/src/providers/storage.provider";

export enum CacheLevel {
  MEDIUM = "CacheLevel::Medium",
  LOW = "CacheLevel::LOW",
  HARD = "CacheLevel::HARD",
  INSTANT = "CacheLevel::INSTANT",
}

export interface CachedData<T> {
  expiredAt: number;
  value: T;
}

/**
 * @notice {CacheProvider} represents a cache provider.
 * @property {storageProvider} The storage provider.
 * @method {get} Get the cached data.
 * @method {set} Set the cached data.
 */
export class CacheProvider {
  /**
   * @notice Create a new instance of CacheProvider.
   * @param storageProvider
   */
  constructor(private readonly storageProvider: StorageProvider) {}

  /**
   * @notice Define cache policy.
   */
  public static CachePolicy: { expiredAfter: Record<string, number> } = {
    expiredAfter: {
      [CacheLevel.HARD]: 7 * 24 * 60 * 60 * 1000, // cached for 7 days
      [CacheLevel.MEDIUM]: 12 * 60 * 60 * 1000, // cached for 4 hours
      [CacheLevel.LOW]: 1 * 60 * 60 * 1000, // cached for 1 hour
      [CacheLevel.INSTANT]: 1 * 60 * 1000, // cached for 1 minute
    },
  };

  /**
   * @notice Get the cached data.
   * @param key
   */
  public get<T>(key: string): T | null {
    const cachedData =
      this.storageProvider.getItemAsJson<CachedData<T>>(key) ||
      ({} as CachedData<T>);

    if (!cachedData || cachedData.expiredAt <= new Date().getTime()) {
      return null;
    }

    return cachedData.value || null;
  }

  /**
   * @notice Set the cached data.
   * @param key
   * @param value
   * @param cacheLevel
   */
  public set<T>(
    key: string,
    value: T,
    cacheLevel: CacheLevel = CacheLevel.HARD
  ): void {
    const cachedData: CachedData<T> = {
      expiredAt:
        new Date().getTime() +
        CacheProvider.CachePolicy.expiredAfter[cacheLevel],
      value: JSON.parse(JSON.stringify(value)) as T,
    };

    this.storageProvider.setItem(key, JSON.stringify(cachedData));
  }
}
