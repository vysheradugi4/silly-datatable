import { Observable, ReplaySubject } from 'rxjs';

import { TableParams } from './../models/table-params.model';


export class RequestService {

  public tableParams = {};
  private _requests = {};

  constructor() { }

  public get requests() {
    return this._requests;
  }


  /**
   * Registered new request object for current table, returns subscribe of changes.
   * @param tableId Table id.
   */
  public call(tableId: string): Observable<TableParams> {
    if (!this._requests[tableId]) {
      this._requests[tableId] = new ReplaySubject<TableParams>(1);
    }

    return this._requests[tableId].asObservable();
  }


  /**
   * Next value with changes for current table.
   * @param tableId Table id.
   * @param tableParams Changes.
   */
  public next(tableId: string): void {
    this._requests[tableId].next(this.tableParams[tableId]);
  }

  public clearTableParams(tableId: string): void {
    if (this._requests[tableId]) {
      this._requests[tableId].complete();
      delete this._requests[tableId];
    }

    if (this.tableParams[tableId]) {
      delete this.tableParams[tableId];
    }
  }
}
