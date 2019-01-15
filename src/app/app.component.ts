import { Component, OnInit } from '@angular/core';

import { TableSettings, Column, PaginationSettings, TableParams, Pagination } from 'projects/silly-datatable/src/public_api';


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
  }


  public request(tableParams: TableParams) {
    console.log('Table params = ', tableParams);
  }


  public selected(row: any) {
    console.log('Clicked row = ', row);
  }
}
