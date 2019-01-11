import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from './../../models/pagination.model';

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
    this._pagination = details;
  }


  /**
   * Css class for pagination div container.
   */
  @Input() public containerClass: string;


  /**
   * Css class for buttons with arrows (start, end, next, prev).
   */
  @Input() public arrowButtonClass: string;


  /**
   * Css class for buttons with number of page.
   */
  @Input() public numberButtonClass: string;


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

}
