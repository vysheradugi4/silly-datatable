import { Component, OnInit, Input } from '@angular/core';

import { Pagination } from './../../models/pagination.model';
import { PaginationSettings } from './../../models/pagination-settings.model';
import { RequestService } from './../../services/request.service';

@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
})
export class SillyDatatablePagingComponent implements OnInit {

  public pageArray: number[];

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;


  private _pagination: Pagination;

  constructor(
    private _requestService: RequestService
  ) { }


  ngOnInit() {
    /**
   * Pagination details, contains current page number, number of pages, number
   * of items per page.
   */
    this._pagination = this._requestService.tableParams.pagination;

    this.pageArray = Array.from({ length: this._pagination.pages }, (_, i) => ++i);
  }


  public pageRequest(page: number): void {
    const pagination = Object.assign(this._pagination, { page });

    this._requestService.tableParams.pagination = pagination;
    this._requestService.next();
  }


  public get currentPage(): number {
    return this._pagination.page;
  }


  public get numberOfPages(): number {
    return this._pagination.pages;
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
}
