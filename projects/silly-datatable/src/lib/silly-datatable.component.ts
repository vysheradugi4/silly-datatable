import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { TableSettings } from './shared/models/table-settings.model';
import { Column } from './shared/models/column.model';

@Component({
  selector: 'ngx-silly-datatable',
  templateUrl: './silly-datatable.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatableComponent {

  @Input() public settings: TableSettings;
  @Input() public columns: Array<Column>;
  @Input() public source: Array<any>;

  constructor() { }

}
