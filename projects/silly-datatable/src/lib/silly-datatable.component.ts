import { SillyDatatablePagingComponent } from './shared/components/silly-datatable-paging/silly-datatable-paging.component';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import forIn from 'lodash/forIn';
import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';
import { TableParams } from './shared/models/table-params.model';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { SillyDatatableFilterComponent } from './shared/components/silly-datatable-filter/silly-datatable-filter.component';


@Component({
  selector: 'ngx-silly-datatable',
  templateUrl: './silly-datatable.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableComponent implements OnInit, OnDestroy {

  /**
   * For identify table when use loading options from localStorage.
   */
  @Input() public id: string;


  /**
   * For store columns settings.
   */
  @Input() public columns: Array<Column>;


  /**
   * Table params contains current paging, search string, sort params.
   */
  @Input() public set tableParams(tableParams: TableParams) {
    this._tableParams = tableParams;

    this.updatePaging();
  }


  /**
   * Stored table settings in service.
   */
  @Input() public settings: TableSettings;


  /**
   * Search component if defined (quick search textbox).
   */
  @Input() public searchComponent: SillyDatatableSearchComponent;


  /**
   * Filters component if defined.
   */
  @Input() public filterComponent: SillyDatatableFilterComponent;


  /**
   * Pagination component if defined.
   */
  @Input() public pagingComponent: SillyDatatablePagingComponent;


  /**
   * Current state of sorting. Contains column id string and boolean isAsc for
   * define sort direction.
   */
  public currentSort: Sort;


  @Output() public request: EventEmitter<TableParams> = new EventEmitter<TableParams>();
  @Output() public rowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public componentCellEvent: EventEmitter<any> = new EventEmitter<any>();


  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _singleClick = true;
  private _tableParams: TableParams;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }


  ngOnInit() {

    /**
     * Table id required.
     */
    if (!this.id) {
      throw new Error('Table id required.');
    }


    /**
     * Table params required.
     */
    if (!this._tableParams) {
      throw new Error('Table params required.');
    }


    /**
     * For handle data from outer components (search, pagination, filters, options).
     */
    this.searchRequestHandler();
    this.filterRequestHandler();
    this.updatePaging();
    this.pagingRequestHandler();



    //   this.optionsService.columnsChanged$.pipe(
    //     takeUntil(this._unsubscribe)
    //   )
    //     .subscribe(() => {
    //       this._changeDetectorRef.detectChanges();
    //     });


    //   /**
    //    * Store items per page option for current table (this.id - is id of table).
    //    */
    //   this.optionsService.itemsPerPageList[this.id] = this.settings && this.settings.itemsPerPage ? this.settings.itemsPerPage : [10];

    //   const itemsPerPage = this.optionsService.getStateFromStorage(this.id, 'itemsPerPage');

    //   (this.requestService.tableParams[this.id] as TableParams)
    //     .pagination.itemsPerPage = itemsPerPage || this.optionsService.itemsPerPageList[this.id][0];
  }


  public get tableParams(): TableParams {
    return this._tableParams;
  }


  public sendRequest(): void {
    this.request.emit(this._tableParams);
  }


  /**
   * Handler for click on column header for sorting.
   * @param columnName Name of column for sorting.
   */
  public sortEnable(columnName: string): void {
    if (!columnName) {
      return;
    }

    /**
     * Change direction
     */
    let isAsc = true;
    if (this.currentSort && this.currentSort.columnName === columnName && this.currentSort.isAsc) {
      isAsc = false;
    }

    this.currentSort = {
      columnName,
      isAsc,
    } as Sort;

    this._tableParams.sort = this.currentSort;
    this.sendRequest();
  }


  /**
   * Handler for click on the row.
   * @param row Clicked row.
   */
  public clicked(row: any): void {
    if (!row) {
      return;
    }

    this._singleClick = true;

    setTimeout(() => {
      if (this._singleClick) {
        this.rowClicked.next(row);
      }
    }, 300);
  }

  /**
   * Handler for double click on the row.
   * @param row Clicked row.
   */
  public doubleClicked(row: any): void {
    if (!row) {
      return;
    }

    this._singleClick = false;
    this.rowDoubleClicked.next(row);
  }


  /**
   * Output event with data from component cell.
   * @param event Data
   */
  public onComponentCellEvent(event): void {
    this.componentCellEvent.next(event);
  }


  public trackByFn(_, item) {
    return item.show;
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();

    // this.requestService.clearTableParams(this.id);
    // this.optionsService.clearColumns(this.id);
    // this.optionsService.clearItemsPerPageInfo(this.id);
  }


  private searchRequestHandler(): void {
    if (!this.searchComponent) {
      return;
    }

    this.searchComponent.searchRequest.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((searchString: string) => {
        this._tableParams.search = searchString;
        this._tableParams.pagination.page = 0;
        this.sendRequest();
      });
  }


  private filterRequestHandler(): void {
    if (!this.filterComponent) {
      return;
    }

    this.filterComponent.filtersUpdated.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((filterValues: string) => {
        this._tableParams.filters = filterValues;
        this._tableParams.pagination.page = 0;
        this.sendRequest();
      });
  }


  private updatePaging(): void {
    if (!this.pagingComponent) {
      return;
    }

    this.pagingComponent.pagination = this._tableParams.pagination;
  }


  private pagingRequestHandler(): void {
    if (!this.pagingComponent) {
      return;
    }

    this.pagingComponent.pageUpdated.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((page: number) => {
        this._tableParams.pagination.page = page;
        this.sendRequest();
      });
  }


  // /**
  //  * Set columns visibility by the localstorage data (user's defined);
  //  * @param columns List of columns
  //  * @returns Changed list.
  //  */
  // private setColumnsDisplay(columns: Array<Column>): Array<Column> {

  //   /**
  //    * Gets user's settings for columns.
  //    */
  //   const states = this.optionsService.getStateFromStorage(this.id, 'shownColumns');

  //   if (states) {
  //     forIn(states, (status: boolean, key: string) => {
  //       const column = (columns as Column[])
  //         .find(c => c.id === key);

  //       column.show = status;
  //     });
  //   }

  //   return columns;
  // }
}
