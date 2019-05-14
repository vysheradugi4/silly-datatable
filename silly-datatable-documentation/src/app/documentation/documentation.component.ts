import { Component, OnInit } from '@angular/core';
import { TableParams, Pagination, PaginationSettings, TableSettings, Column } from 'silly-datatable';
import { EditButtonComponent } from 'src/app/examples/edit-button/edit-button.component';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {

  public route: boolean;


  /**
   * For example
   */
  public paginationSettings: PaginationSettings;
  public settings: TableSettings;
  public columns: Array<Column>;
  public source: Array<any>;


  private _tableParams: TableParams = new TableParams();

  constructor() { }

  public get tableParams(): TableParams {
    return this._tableParams;
  }


  public set tableParams(value: TableParams) {
    this._tableParams = Object.assign({}, this._tableParams, { source: this.source });
    console.log('Request with table params = ', value);
  }

  ngOnInit() {

    this._tableParams.pagination = {
      pageNumber: 0,
      pageCount: 50,
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
      tableClass: 'example-table',
      headerRowClass: 'header-row',
      rowClass: 'data-row',
      sortHeaderClass: 'sort',
      itemsPerPageList: [10, 20, 30],
      batchSelect: true,
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
        prepareCellFunction: (value: string, row: any, td: HTMLElement, tr: HTMLElement) => {
          td.classList.add('tester');
          return value.toUpperCase();
        },
      } as Column,
      {
        id: 'description',
        title: 'Description',
        headerClass: 'description',
        cellClass: 'cell',
        sortable: false,
      } as Column,
      {
        id: 'contact.address',
        title: 'Contact',
        headerClass: 'contact',
        cellClass: 'cell',
        sortable: true,
      } as Column,
      {
        id: 'action',
        title: 'Action',
        headerClass: 'action',
        cellClass: 'cell',
        sortable: false,
        componentCell: EditButtonComponent,
      } as Column,
    ];

    this.source = [
      { id: 1, name: 'test1', description: 'some description', contact: { address: 'first' } },
      { id: 2, name: 'test2', description: 'some description', contact: { address: 'second' } },
      { id: 3, name: 'test3', description: 'some description', contact: { address: 'third' } },
      { id: 4, name: 'test4', description: 'some description', contact: { address: 'fourth' } },
      { id: 5, name: 'test5', description: 'some description', contact: { address: 'fifth' } },
    ];
  }
}
