import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Pagination } from './../../models/pagination.model';
import { PaginationSettings } from './../../models/pagination-settings.model';
import { RequestService } from './../../services/request.service';
import { TableParams } from './../../models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatablePagingComponent implements OnInit, OnDestroy {

  public pageArray: Array<number> = [];

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;

  @Input() public tableId = 'sole';


  private _pagination: Pagination = new Pagination;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _tableParams: TableParams;

  constructor(
    private _requestService: RequestService
  ) { }


  ngOnInit() {

    /**
   * Pagination details, contains current page number, number of pages, number
   * of items per page.
   */
    this._requestService.call(this.tableId).pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((tableParams: TableParams) => {
        this._tableParams = tableParams;
        this._pagination = tableParams.pagination;
        this.pageArray = Array.from({ length: this._pagination.pages }, (_, i) => ++i);
      });
  }


  public pageRequest(page: number): void {
    this._tableParams.pagination = Object.assign(this._pagination, { page });

    this._requestService.next(this.tableId, this._tableParams);
  }


  public get currentPage(): number {
    return this._pagination.page || null;
  }


  public get numberOfPages(): number {
    return this._pagination.pages || null;
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
