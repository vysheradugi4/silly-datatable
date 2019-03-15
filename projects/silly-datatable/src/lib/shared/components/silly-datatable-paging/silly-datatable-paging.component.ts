import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { PaginationSettings } from './../../models/pagination-settings.model';
import { TableParams } from './../../models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
})
export class SillyDatatablePagingComponent implements OnInit, OnDestroy {

  public pageArray: Array<number> = [];

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;
  @Input() public tableParams: TableParams;

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {  }


  public pageRequest(page: number): void {
    // this.requestService.tableParams[this.tableId].pagination.page = page;

    // this.requestService.next(this.tableId);
  }


  public get currentPage(): number {
    return this.tableParams.pagination.page;
  }


  public get numberOfPages(): number {
    return this.tableParams.pagination.pages;
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
