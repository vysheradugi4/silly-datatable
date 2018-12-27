import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';
import { Sort } from 'projects/silly-datatable/src/lib/shared/models/sort.model';


@Component({
  selector: 'ngx-silly-datatable',
  templateUrl: './silly-datatable.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableComponent {

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
  public sortEnable(columnName: string) {
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
    this.rowClicked.next(row);
  }
}
