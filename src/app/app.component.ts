import { Component, OnInit } from '@angular/core';

import {
  TableSettings,
  Column,
  PaginationSettings,
  TableParams,
  Pagination,
  FilterFormField
} from 'projects/silly-datatable/src/public_api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public settings: TableSettings;
  public tableParams: TableParams = new TableParams();
  public paginationSettings: PaginationSettings;
  public columns: Array<Column>;
  public source: Array<any>;
  public filterSettings: Array<FilterFormField>;

  constructor() { }

  ngOnInit(): void {

    this.tableParams.pagination = {
      page: 0,
      pages: 10,
      itemsPerPage: 10,
    } as Pagination;


    this.paginationSettings = {
      infoClass: 'info-class',
      containerClass: 'container-class',
      arrowButtonClass: 'arrow-button-class',
      numberButtonClass: 'number-button-class',
      start: '&laquo;',
      prev: '&lsaquo;',
      next: '&rsaquo;',
      last: '&raquo;',
    } as PaginationSettings;


    this.settings = {
      tableClass: 'table',
      headerRowClass: 'header-row',
      rowClass: 'data-row',
      sortHeaderClass: 'sort',
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


    this.filterSettings = [
      {
        id: 'name',
        type: 'textbox',
        name: 'name',
        placeholder: 'Enter name...',
        value: 'faster',
      },
      {
        id: 'type',
        type: 'dropbox',
        name: 'type',
        value: [
          { key: 1, value: 'Test value 1' },
          { key: 2, value: 'Test value 2' },
          { key: 3, value: 'Test value 3' },
        ],
        placeholder: 'Select type ...',
      },
    ];
  }


  public request(tableParams: TableParams) {
    console.log('Table params = ', tableParams);
  }


  public selected(row: any) {
    console.log('Clicked row = ', row);
  }
}
