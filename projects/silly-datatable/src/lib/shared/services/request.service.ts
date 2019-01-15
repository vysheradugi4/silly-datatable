import { Subject } from 'rxjs';

import { TableParams } from './../models/table-params.model';


export class RequestService {

  public tableParams: TableParams;

  private _call$: Subject<TableParams> = new Subject<TableParams>();

  constructor() { }


  public get call$() {
    return this._call$.asObservable();
  }


  public next(): void {
    this._call$.next(this.tableParams);
  }
}
