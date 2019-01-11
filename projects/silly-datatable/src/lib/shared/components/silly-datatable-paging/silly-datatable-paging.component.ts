import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from './../../models/pagination.model';
import { PaginationSettigns } from './../../models/pagination-settings.model';

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
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettigns;


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
