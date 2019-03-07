import { Subject, Observable } from 'rxjs';


export class OptionsService {

  public columns = {};
  public itemsPerPageList = {};

  private _columnsChanged$: Subject<null> = new Subject();

  constructor() { }


  public get columnsChanged$(): Observable<null> {
    return this._columnsChanged$.asObservable();
  }


  public columnsChanged(): void {
    this._columnsChanged$.next();
  }


  public clearColumns(id: string) {
    if (this.columns[id]) {
      delete this.columns[id];
    }
  }


  public clearItemsPerPageInfo(id: string) {
    if (this.itemsPerPageList[id]) {
      delete this.itemsPerPageList[id];
    }
  }


  public storeState(tableId: string, value: any, storageFieldName: string): void {
    let data = {
      [tableId]: value,
    };

    if (storageFieldName in localStorage) {
      const oldData = localStorage.getItem(storageFieldName);
      data = Object.assign({}, JSON.parse(oldData), data);
    }

    localStorage.setItem(storageFieldName, JSON.stringify(data));
  }


  public getStateFromStorage(tableId: string, storageFieldName: string): any {
    if (!(storageFieldName in localStorage)) {
      return null;
    }

    return JSON.parse(localStorage.getItem(storageFieldName))[tableId];
  }
}
