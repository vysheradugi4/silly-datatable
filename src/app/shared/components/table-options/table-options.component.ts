import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { OptionsSettings } from './../../../../../projects/silly-datatable/src/lib/shared/models/options-settings.model';


@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent implements OnInit {

  @ViewChild('tableOptions') public tableOptions: any;

  public optionsSettings: OptionsSettings;

  @Output() public options = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.optionsSettings = {
      containerClass: 'containerClass',
      columnsSectionClass: 'columnsSectionClass',
      columnsTitleClass: 'columnsTitleClass',
      columnsTitle: 'columnsTitle',
      checkboxContainerClass: 'checkboxContainerClass',
      checkboxClass: 'checkboxClass',
      labelCheckboxContainerClass: 'labelCheckboxContainerClass',
      labelCheckboxClass: 'labelCheckboxClass',
      itemsPerPageSectionClass: 'itemsPerPageSectionClass',
      labelSelectClass: 'labelSelectClass',
      itemsPerPageTitle: 'Items Per Page',
      selectClass: 'selectClass',
    } as OptionsSettings;

    this.options.emit(this.tableOptions);
  }
}
