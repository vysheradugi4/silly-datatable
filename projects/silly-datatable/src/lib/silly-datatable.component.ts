import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import forIn from 'lodash/forIn';
import { OptionsService } from './shared/services/options.service';
import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';
import { RequestService } from './shared/services/request.service';
import { TableParams } from './shared/models/table-params.model';


@Component({
  selector: 'ngx-silly-datatable',
  templateUrl: './silly-datatable.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableComponent implements OnInit, OnDestroy {

  /**
   * Current state of sorting. Contains column id string and boolean isAsc for
   * define sort direction.
   */
  public currentSort: Sort;

  /**
   * Id string for link current datatable component with filter, search etc.
   */
  @Input() public id = 'sole';

  @Input() public set columns(list: Array<Column>) {

    this.optionsService.columns[this.id] = this.setColumnsDisplay(list);
  }

  /**
   * Table params contains current paging, search string, sort params.
   */
  @Input() public set tableParams(params: TableParams) {
    this.requestService.tableParams[this.id] = params;
  }

  /**
   * Stored table settings in service.
   */
  @Input() public settings: TableSettings;

  @Output() public request: EventEmitter<TableParams> = new EventEmitter<TableParams>();
  @Output() public rowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public rowDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public componentCellEvent: EventEmitter<any> = new EventEmitter<any>();

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _singleClick = true;

  constructor(
    public requestService: RequestService,
    public optionsService: OptionsService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }


  ngOnInit() {

    /**
     * Table params required.
     */
    if (!this.requestService.tableParams[this.id]) {
      throw new Error('Table params required.');
    }


    /**
     * Search request hanlder.
     */
    this.requestService.call(this.id).pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((tableParams: TableParams) => {
        this.request.emit(tableParams);
      });


    this.optionsService.columnsChanged$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe(() => {
        this._changeDetectorRef.detectChanges();
      });


    /**
     * Store items per page option for current table (this.id - is id of table).
     */
    this.optionsService.itemsPerPageList[this.id] = this.settings && this.settings.itemsPerPage ? this.settings.itemsPerPage : [10];

    const itemsPerPage = this.optionsService.getStateFromStorage(this.id, 'itemsPerPage');

    (this.requestService.tableParams[this.id] as TableParams)
      .pagination.itemsPerPage = itemsPerPage || this.optionsService.itemsPerPageList[this.id][0];
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

    this.requestService.tableParams[this.id].sort = this.currentSort;
    this.requestService.next(this.id);
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

    this.requestService.clearTableParams(this.id);
    this.optionsService.clearColumns(this.id);
    this.optionsService.clearItemsPerPageInfo(this.id);
  }


  /**
   * Set columns visibility by the localstorage data (user's defined);
   * @param columns List of columns
   * @returns Changed list.
   */
  private setColumnsDisplay(columns: Array<Column>): Array<Column> {

    /**
     * Gets user's settings for columns.
     */
    const states = this.optionsService.getStateFromStorage(this.id, 'shownColumns');

    if (states) {
      forIn(states, (status: boolean, key: string) => {
        const column = (columns as Column[])
          .find((c, i, a) => c.id === key);

        column.show = status;
      });
    }

    return columns;
  }
}
