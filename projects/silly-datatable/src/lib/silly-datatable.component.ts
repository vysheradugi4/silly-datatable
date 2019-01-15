import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';
import { SettingsService } from './shared/services/settings.service';
import { Subject } from 'rxjs';
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
   * Current state of sorting. Contains column id string and order (asc, desc).
   */
  public currentSort: Sort;

  @Input() public columns: Array<Column>;
  @Input() public source: Array<any>;


  /**
   * Table params contains current paging, search string, sort params.
   */
  @Input() public set tableParams(params: TableParams) {
    this._requestService.tableParams = params;
  }

  /**
   * Stored table settings in service.
   */
  @Input() set settings(value: TableSettings) {
    this.settingsService.config = value;
  }

  @Output() public request: EventEmitter<TableParams> = new EventEmitter<TableParams>();
  @Output() public rowClicked: EventEmitter<Sort> = new EventEmitter<Sort>();

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    public settingsService: SettingsService,
    private _requestService: RequestService
  ) { }


  ngOnInit() {
    /**
     * Search request hanlder.
     */
    this._requestService.call$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((tableParams: TableParams) => {
        this.request.emit(tableParams);
      });
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
    let order = 'asc';
    if (this.currentSort && this.currentSort.columnName === columnName && this.currentSort.order === 'asc') {
      order = 'desc';
    }

    this.currentSort = {
      columnName,
      order,
    } as Sort;

    this._requestService.tableParams.sort = this.currentSort;
    this._requestService.next();
  }


  /**
   * Handler for click on the row.
   * @param row Clicked row.
   */
  public clicked(row: any): void {
    if (!row) {
      return;
    }

    this.rowClicked.next(row);
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}
