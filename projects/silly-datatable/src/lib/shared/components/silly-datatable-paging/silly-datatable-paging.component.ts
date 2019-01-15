import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from './../../models/pagination.model';
import { PaginationSettings } from './../../models/pagination-settings.model';

@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
})
export class SillyDatatablePagingComponent implements OnInit {

  public pageArray: number[];

  /**
   * Pagination details, contains current page number, number of pages, number
   * of items per page.
   */
  @Input() public set pagination(details: Pagination) {
    // Page validation.
    details.page = details.page > details.pages - 1 ? details.pages - 1 : details.page;

    this._pagination = details;
  }


  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;


  /**
   * New page data and pagination details request.
   */
  @Output() changePage: EventEmitter<Pagination> = new EventEmitter();


  private _pagination: Pagination;

  constructor() { }


  ngOnInit() {
    this.pageArray = Array.from({ length: this._pagination.pages }, (_, i) => ++i);
  }


  public pageRequest(page: number): void {
    const pagination = Object.assign(this._pagination, { page });

    this.changePage.emit(pagination);
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

  // tslint:disable-next-line:max-line-length
  // ((numberOfPages > 5 && numberOfPages - currentPage < 3) ? (numberOfPages - 5) : (currentPage > 1 && currentPage < 3 ? currentPage - 2 : 0)):(currentPage < 2 ? 5 : currentPage + 3)


}
