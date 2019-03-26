import { Component, Input, TemplateRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { PaginationSettings } from './../../models/pagination-settings.model';
import { Pagination } from './../../models/pagination.model';


@Component({
  selector: 'ngx-silly-datatable-paging',
  templateUrl: './silly-datatable-paging.component.html',
  styles: [],
})
export class SillyDatatablePagingComponent {

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings;

  @Input() public set pagination(value: Pagination) {
    if (!value) {
      return;
    }

    this._pagination = value;
    this.initPaginationLogic();
  }


  /**
   * Template for replace text "Page 5 of 10" to anything else with use page
   * number (use {{ currentPage + 1 }}) and pages count (use {{ numberOfPages }})
   * values.
   */
  @Input() public pageOf: TemplateRef<any>;
  public pagingContext: any;

  private _pageUpdated$: Subject<number> = new Subject<number>();
  private _pagination: Pagination;

  constructor() { }


  public initPaginationLogic(): void {

    /**
     * Create context for Page .. of .. custom template.
     */
    if (this.pageOf) {
      this.pagingContext = {
        currentPage: this.currentPage,
        numberOfPages: this.numberOfPages,
      };
    }
  }


  public get pagination(): Pagination {
    return this._pagination;
  }


  public get pageUpdated$(): Observable<number> {
    return this._pageUpdated$.asObservable();
  }


  public pageRequest(page: number): void {
    this._pageUpdated$.next(page);
  }


  public get currentPage(): number {
    if (this._pagination.pageNumber < 0 || (this._pagination.pageNumber + 1) > this.numberOfPages) {
      return 0;
    }

    return this._pagination.pageNumber;
  }


  public get numberOfPages(): number {
    return this._pagination.pageCount;
  }


  /**
   * Start slice pages array.
   * @returns number.
   */
  public get start(): number {
    if (this.currentPage < 1 || !this.numberOfPages) {
      return 0;
    }

    if ((this.numberOfPages - this.currentPage) < 3) {

      if (this.numberOfPages > 4) {
        return this.numberOfPages - 5;
      }
    }

    if (this.currentPage > 2) {
      return this.currentPage - 2;
    }

    return 0;
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
