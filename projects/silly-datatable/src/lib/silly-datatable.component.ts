import { SillyDatatableOptionsComponent } from './shared/components/silly-datatable-options/silly-datatable-options.component';
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
  Injector
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import unionBy from 'lodash/unionBy';
import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';
import { TableParams } from './shared/models/table-params.model';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { SillyDatatableFilterComponent } from './shared/components/silly-datatable-filter/silly-datatable-filter.component';
import { StoreService } from './shared/services/store.service';


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
   * Stored table settings in service.
   */
  @Input() public settings: TableSettings;


  /**
   * Table params contains current paging, search string, sort params.
   */
  @Input() public set tableParams(tableParams: TableParams) {
    if (!tableParams) {
      return;
    }

    this._tableParams = tableParams;
    this.updatePaging();
    this.updateOptionsItemsPerPage();
  }


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
   * Options component if defined.
   */
  @Input() public set optionsComponent(component) {
    if (!component) {
      return;
    }

    this._optionsComponent = component;

    this.updateOptionsColumns();
    this.updateOptionsItemsPerPage();
    this.optionsChangeHandler();
  }


  /**
   * Current state of sorting. Contains column id string and boolean isDesc for
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
  private _tableUid: string;
  private _optionsComponent: SillyDatatableOptionsComponent;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _storeService: StoreService,
    private _inj: Injector
  ) { }


  public get optionsComponent() {
    return this._optionsComponent;
  }


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
     * Create tableUid, will be used for store options.
     */
    this.createTableUid();


    /**
     * Setup columns states by saved options.
     */
    this.setColumnsDisplay();


    /**
     * For handle data from outer components (search, pagination, filters, options).
     */
    this.searchRequestHandler();
    this.filterRequestHandler();
    this.pagingRequestHandler();
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
    let isDesc = false;
    if (this.currentSort && this.currentSort.columnName === columnName && !this.currentSort.isDesc) {
      isDesc = true;
    }

    this.currentSort = {
      columnName,
      isDesc,
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
  }


  private searchRequestHandler(): void {
    if (!this.searchComponent) {
      return;
    }

    this.searchComponent.searchRequest$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((searchString: string) => {
        this._tableParams.searchText = searchString;
        this._tableParams.pagination.pageNumber = 0;
        this.sendRequest();
      });
  }


  private filterRequestHandler(): void {
    if (!this.filterComponent) {
      return;
    }

    this.filterComponent.filtersUpdated$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((filterValues: string) => {
        this._tableParams.filters = filterValues;
        this._tableParams.pagination.pageNumber = 0;
        this.sendRequest();
      });
  }


  private updatePaging(): void {

    /**
     * Try to load stored value for items per page.
     */
    if (this._storeService.isStored('itemsPerPage', this._tableUid)) {
      this._tableParams.pagination.itemsPerPage = this._storeService.getStateFromStorage('itemsPerPage', this._tableUid);
    }


    /**
     * Fill items per page and items per page list.
     */
    if (this._tableParams.pagination.itemsPerPageList) {

      if (!this._tableParams.pagination.itemsPerPage) {
        this._tableParams.pagination.itemsPerPage = this._tableParams.pagination.itemsPerPageList[0];
      }
    } else {

      if (!this._tableParams.pagination.itemsPerPage) {
        /**
         * 10 items per page by default.
         */
        this._tableParams.pagination.itemsPerPage = 10;
      }

      this._tableParams.pagination.itemsPerPageList = [this._tableParams.pagination.itemsPerPage];
    }

    if (this.pagingComponent) {
      this.pagingComponent.pagination = this._tableParams.pagination;
    }
  }


  private pagingRequestHandler(): void {
    if (!this.pagingComponent) {
      return;
    }

    this.pagingComponent.pageUpdated$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((page: number) => {
        this._tableParams.pagination.pageNumber = page;
        this.sendRequest();
      });
  }


  private updateOptionsColumns(): void {
    this._optionsComponent.columns = this.columns;
  }


  private updateOptionsItemsPerPage(): void {
    if (!this._optionsComponent) {
      return;
    }

    this._optionsComponent.itemsPerPageObjects = {
      itemsPerPage: this._tableParams.pagination.itemsPerPage,
      itemsPerPageList: this._tableParams.pagination.itemsPerPageList,
    };
  }


  private optionsChangeHandler(): void {
    this.optionsComponent.columnsChanged$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((changedColumns: Array<Column>) => {
        this.columns = changedColumns;
        this._changeDetectorRef.detectChanges();

        let dataForStore = changedColumns.map((column: Column) => {
          return { id: column.id, show: column.show };
        });

        /**
         * Merge old state with new.
         */
        if (this._storeService.isStored('shownColumns', this._tableUid)) {
          const oldData = this._storeService.getStateFromStorage('shownColumns', this._tableUid);
          dataForStore = unionBy(dataForStore, oldData, 'id');
        }

        this._storeService.storeState('shownColumns', this._tableUid, dataForStore);
      });

    this.optionsComponent.itemsPerPageChanged$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((items: number) => {
        this._tableParams.pagination.itemsPerPage = items;

        this._storeService.storeState('itemsPerPage', this._tableUid, items);
      });
  }


  private createTableUid() {
    const parentComponentTypeName = (this._inj as any).view.component.constructor.name;
    this._tableUid = `${parentComponentTypeName}_${this.id}`;
  }


  /**
   * Set columns visibility by the localstorage data (user's defined);
   * @param columns List of columns
   * @returns Changed list.
   */
  private setColumnsDisplay(): void {

    if (!this._storeService.isStored('shownColumns', this._tableUid)) {
      return;
    }


    /**
     * Gets user's settings for columns.
     */
    const states = this._storeService.getStateFromStorage('shownColumns', this._tableUid);


    if (states) {
      states.forEach(colStatus => {
        this.columns.find((column: Column) => column.id === colStatus.id).show = colStatus.show;
      });
    }
  }
}
