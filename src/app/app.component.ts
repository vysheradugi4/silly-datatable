import { Component, OnInit } from '@angular/core';

import { TableSettings, Column, Sort } from 'projects/silly-datatable/src/public_api';


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
      headerRowClass: 'header-row',
      rowClass: 'data-row',
      sortHeaderClass: 'sort',
      searchInputClass: 'search-field',
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
        headerClass: 'name',
        cellClass: 'cell',
        sortable: true,
        prepareCellFunction: value => value.toUpperCase(),
      } as Column,
      {
        id: 'description',
        title: 'Description',
        headerClass: 'description',
        cellClass: 'cell',
        sortable: false,

      } as Column,
    ];

    this.source = [
      { id: 1, name: 'test1', description: 'some description' },
      { id: 2, name: 'test2', description: 'some description' },
      { id: 3, name: 'test3', description: 'some description' },
      { id: 4, name: 'test4', description: 'some description' },
      { id: 5, name: 'test5', description: 'some description' },
    ];
  }


  public sorting(details: Sort) {
    console.log(details);
  }


  public selected(row: any) {
    console.log(row);
  }
}
