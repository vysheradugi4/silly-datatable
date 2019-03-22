export class StoreService {

  constructor() { }

  /**
   * Saves data with key, contains field name and id. Store in localStorage
   * @param storageFieldName Field name.
   * @param id Id
   * @param data Dataset for saving.
   */
  public storeState(storageFieldName: string, id: string, data: any): void {

    const key = this.getKey(storageFieldName, id);

    localStorage.setItem(key, JSON.stringify(data));
  }


  /**
   * Gets dataset from localStorage by the field name and id.
   * @param storageFieldName Filed name.
   * @param id Id.
   * @returns Saved data.
   */
  public getStateFromStorage(storageFieldName: string, id: string): any {

    const key = this.getKey(storageFieldName, id);

    if (!(key in localStorage)) {
      return null;
    }

    return JSON.parse(localStorage.getItem(key));
  }


  /**
   * Checks what localStorage contains dataset with current field name and id.
   * @param storageFieldName Field name.
   * @param id Id
   * @return Boolena status.
   */
  public isStored(storageFieldName: string, id: string): boolean {
    const key = this.getKey(storageFieldName, id);
    return key in localStorage;
  }


  /**
   * Creates string key from two strings.
   * @param str1 First string for key.
   * @param str2 Second string for key.
   * @returns Key.
   */
  private getKey(str1: string, str2: string): string {
    return `${str1}_${str2}`;
  }
}
