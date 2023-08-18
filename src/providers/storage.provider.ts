export class StorageProvider {
  /**
   * @notice Constructor to initialize StorageProvider with the prefix and localStorage
   * @param PREFIX
   * @param localStorage
   */
  private PREFIX = "HAMSTER_SWAP";

  /**
   * @param key
   * @param value
   * @description
   * The function to set the value with an associated key
   */
  public setItem(key: string, value: string): void {
    if (!localStorage) return null;
    global.localStorage.setItem(`${this.PREFIX}_${key}`, value);
  }

  /**
   * @param key
   * @returns value
   * @description
   * The function to get value with an associated key
   */
  public getItem(key: string): string | null {
    if (!global.localStorage) return null;
    return global.localStorage.getItem(`${this.PREFIX}_${key}`);
  }

  /**
   * @param key
   * @returns
   * @description
   * The function to remove value with an associated key
   */
  public removeItem(key: string): void {
    if (!global.localStorage) return null;
    return global.localStorage.removeItem(`${this.PREFIX}_${key}`);
  }

  /**
   * @notice The function to get item as json format
   * @param key
   */
  public getItemAsJson<T>(key: string): T | null {
    const value = this.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }
}
