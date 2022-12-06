export class StorageProvider {
  private readonly PREFIX = process.env.HOST_NAME;

  /**
   * @param key
   * @param value
   * @description
   * The function to set the value with an associated key
   */
  public setItem(key: string, value: string): void {
    localStorage.setItem(`${this.PREFIX}_${key}`, value);
  }

  /**
   * @param key
   * @returns value
   * @description
   * The function to get value with an associated key
   */
  public getItem(key: string): string | null {
    return localStorage.getItem(`${this.PREFIX}_${key}`);
  }

  /**
   * @param key
   * @param {boolean} wPrefix true mean user wanna remove a storage data which saved without hamster prefix.
   * @returns
   * @description
   * The function to remove value with an associated key
   */
  public removeItem(key: string, wPrefix?: boolean): void {
    if (wPrefix) {
      return localStorage.removeItem(key);
    }
    return localStorage.removeItem(`${wPrefix ? "" : this.PREFIX}_${key}`);
  }
}
