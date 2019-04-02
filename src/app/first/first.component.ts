import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import {
  TableSettings,
  Column,
  PaginationSettings,
  TableParams,
  Pagination,
  FilterFormField,
  FilterSettings
} from 'projects/silly-datatable/src/public_api';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {

  public settings: TableSettings;
  public paginationSettings: PaginationSettings;
  public columns: Array<Column>;
  public source: Array<any>;
  public filterFormFields: Array<FilterFormField>;
  public filterSettings: FilterSettings;
  public detailsDropboxFilter: FilterFormField;
  public optionsComponent: any;
  public pagingComponent: any;

  @ViewChild('customInput') public customInput: TemplateRef<any>;

  public loading: boolean;

  private _tableParams: TableParams = new TableParams();

  constructor() { }

  public get tableParams(): TableParams {
    return this._tableParams;
  }


  public set tableParams(value: TableParams) {
    console.log('Request with table params = ', value);
  }


  ngOnInit(): void {

    this._tableParams.pagination = {
      pageNumber: 0,
      pageCount: 10,
      itemsPerPage: 1,
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
      itemsPerPageList: [1, 3, 5],
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
      { id: 1, name: 'test1', description: 'some description' },
      { id: 2, name: 'test2', description: 'some description' },
      { id: 3, name: 'test3', description: 'some description' },
      { id: 4, name: 'test4', description: 'some description' },
      { id: 5, name: 'test5', description: 'some description' },
    ];

    this._tableParams.source = this.source;

    this.detailsDropboxFilter = {
      id: 'details',
      type: 'dropbox',
      name: 'details',
      placeholder: 'Select details ...',
      value: null,
      valueKeyName: 'value',
      controlContainerClass: 'control-container',
      labelContainerClass: 'label-container',
      formControlLabel: 'Dropbox',
    } as FilterFormField;


    this.filterFormFields = [
      {
        id: 'dateRange',
        type: 'custom',
        name: 'dateRange',
        placeholder: 'custom control',
        controlContainerClass: 'control-container',
        labelContainerClass: 'label-container',
        formControlLabel: 'Textbox',
        customInput: this.customInput,
      } as FilterFormField,
      {
        id: 'name',
        type: 'textbox',
        name: 'name',
        placeholder: 'Enter name...',
        value: 'faster',
        controlContainerClass: 'control-container',
        labelContainerClass: 'label-container',
        formControlLabel: 'Textbox',
      } as FilterFormField,
      {
        id: 'type',
        type: 'dropbox',
        name: 'type',
        value: null,
        placeholder: 'Select type ...',
        valueKeyName: 'value',
        source: [
          { key: 1, value: 'Test value 1' },
          { key: 2, value: 'Test value 2' },
          { key: 3, value: 'Test value 3' },
        ],
        controlContainerClass: 'control-container',
        labelContainerClass: 'label-container',
        formControlLabel: 'Dropbox',
      } as FilterFormField,

      this.detailsDropboxFilter,
    ];


    this.filterSettings = {
      formContainerClass: 'filter-container',
      cancelButtonClass: 'cancel-button-class',
      cancelButtonTitle: 'Close',
      submitButtonClass: 'submit-button-class',
      submitButtonTitle: 'Submit',
    } as FilterSettings;
  }


  public selected(row: any) {
    console.log('Clicked row = ', row);
  }


  public dblClickSelected(row: any) {
    console.log('Double clicked row = ', row);
  }


  public eventInCellComponent(event) {
    console.log('event and data from cell component = ', event);
  }


  public filterValueChanges(filterData) {

    if (filterData.type && !filterData.details) {
      this.detailsDropboxFilter.source = [
        { key: 1, value: 'Test value 1' },
        { key: 2, value: 'Test value 2' },
        { key: 3, value: 'Test value 3' },
      ];

      this.filterFormFields = this.filterFormFields.slice();
    }
  }

  public getOptions(component) {
    setTimeout(() => {
      this.optionsComponent = component;
    });
  }


  public getPaging(component) {
    setTimeout(() => {
      this.pagingComponent = component;
    });
  }
}
