export class StoreService {

  constructor() { }

  public storeState(data: any, storageFieldName: string): void {

    if (storageFieldName in localStorage) {
      const oldData = localStorage.getItem(storageFieldName);
      data = Object.assign({}, JSON.parse(oldData), data);
    }

    localStorage.setItem(storageFieldName, JSON.stringify(data));
  }


  public getStateFromStorage(storageFieldName: string): any {
    if (!(storageFieldName in localStorage)) {
      return null;
    }

    return JSON.parse(localStorage.getItem(storageFieldName));
  }
}
