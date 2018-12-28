import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from './shared/models/sort.model';


@Component({
  selector: 'ngx-silly-datatable',
  templateUrl: './silly-datatable.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableComponent {

  /**
   * Current state of sorting. Contains column id string and order (asc, desc).
   */
  public currentSort: Sort;

  @Input() public settings: TableSettings;
  @Input() public columns: Array<Column>;
  @Input() public source: Array<any>;

  @Output() public sort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() public rowClicked: EventEmitter<Sort> = new EventEmitter<Sort>();

  constructor() { }


  /**
   * Handler for click on column header for sorting.
   * @param columnName Name of column for sorting.
   */
  public sortEnable(columnName: string): void {
    if (!columnName) {
      return;
    }

    // Check direction.
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
}
