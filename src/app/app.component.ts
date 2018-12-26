import { Component, OnInit } from '@angular/core';

import { TableSettings, Column } from 'projects/silly-datatable/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public settings: TableSettings;
  public columns: Array<Column>;
  public source: Array<any>;
  constructor() { }

  ngOnInit(): void {

    this.settings = {
      tableClass: 'table',
    } as TableSettings;

    this.columns = [
      {
        id: 'id',
        title: 'No.',
        headerClass: 'id',
        cellClass: 'cell',
        sortable: true,

      } as Column,
      {
        id: 'name',
        title: 'Name',
        headerClass: 'id',
        cellClass: 'cell',
        sortable: true,
      } as Column,
    ];

    this.source = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' },
      { id: 3, name: 'test3' },
      { id: 4, name: 'test4' },
      { id: 5, name: 'test5' },
    ];
  }
}
