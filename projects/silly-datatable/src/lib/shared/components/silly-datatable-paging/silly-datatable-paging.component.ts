import { Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { Pagination } from './../../models/pagination.model';
import { PaginationSettings } from './../../models/pagination-settings.model';
import { RequestService } from './../../services/request.service';
import { TableParams } from './../../models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
})
export class SillyDatatablePagingComponent implements OnDestroy {

  public pageArray: Array<number> = [];

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;

  @Input() public tableId = 'sole';

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    public requestService: RequestService
  ) { }


  public pageRequest(page: number): void {
    this.requestService.tableParams[this.tableId].pagination.page = page;

    this.requestService.next(this.tableId);
  }


  public get currentPage(): number {
    return this.requestService.tableParams[this.tableId].pagination.page || null;
  }


  public get numberOfPages(): number {
    return this.requestService.tableParams[this.tableId].pagination.pages || null;
  }


  /**
   * Start slice pages array.
   * @returns number.
   */
  public get start(): number {
    if (this.currentPage < 1) {
      return 0;
    }

    if ((this.numberOfPages - this.currentPage) < 3) {

      if (this.numberOfPages > 4) {
        return this.numberOfPages - 5;
      }

      return 0;
    }

    if (this.currentPage > 2) {
      return this.currentPage - 2;
    }

  }


  /**
   * End slice pages array.
   * @returns number.
   */
  public get end(): number {
    if (this.currentPage < 2) {
      return 5;
    }

    return this.currentPage + 3;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}
