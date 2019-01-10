import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';
import { SettingsService } from './shared/services/settings.service';
import { SearchService } from './shared/services/search.service';
import { Subject } from 'rxjs';


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
   * Stored table settings in service.
   */
  @Input() set settings(value: TableSettings) {
    this.settingsService.config = value;
  }

  @Output() public sort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() public rowClicked: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() public searchRequest: EventEmitter<string> = new EventEmitter();

  private _unsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    public settingsService: SettingsService,
    private _searchService: SearchService
  ) { }


  ngOnInit() {
    /**
     * Search request hanlder.
     */
    this._searchService.request$.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((searchRequest: string) => {
        this.searchRequest.emit(searchRequest);
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

    this.sort.next(this.currentSort);
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
