# Silly Datatable – Angular 6+ light datatable

For angular 6+ versions apps. Easy styling datatable, all functionality is   
designed for use server side actions.
    
    
## Installation

Run for installation Silly Datatable library in your project.

`npm install silly-datatable --save`   
    
Add in import section in your module   

`SillyDatatableModule`     
   
Don't forget import this module:     

`import { SillyDatatableModule } from 'silly-datatable';`
    
    
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app   
will automatically reload if you change any of the source files.
    
    
## Build

Run `ng build` to build the project. The build artifacts will be stored in   
the `dist/` directory. Use the `--prod` flag for a production build.
    
    
## Running unit tests

Run `ng test` to execute the unit tests via    
[Karma](https://karma-runner.github.io).
    
    
## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via    
[Protractor](http://www.protractortest.org/).
    
    
## Component template part

For use Silly Datatable insert in your template component tag:   

`<ngx-silly-datatable></ngx-silly-datatable>`
   
for add search field:

`<ngx-silly-datatable-search></ngx-silly-datatable-search>`

for add paging:   

`<ngx-silly-datatable-paging></ngx-silly-datatable-paging>`


## Silly datatable component attributes
   
For setup styles and data representation of Silly Datatable use following   
attributes.  
   
   
__Main settings:__   
   
`<ngx-silly-datatable [settings]="settings"></ngx-silly-datatable>`

Object `settings` is a instance of class `TableSettings`. It has the following   
properties:

* `tableClass` – Class will be added to `<table>` tag. Class for all table.   
   
* `headerRowClass` – Class for first row of table for header. Will be added in   
first `<tr>` tag.
   
* `rowClass` – Class for each row in table except first (header) row. Will be   
added to each `<tr>` tag except first.
   
* `sortHeaderClass` – Class for sortable header link. Will be added to `<a>` tag.
   
    
__Outputs Events__
   
* `searchRequest` – Triggered when user used search input.


All properties are optional. 


Example of settings:

```
this.settings = {
        tableClass: 'table',
        headerRowClass: 'header-row',
        rowClass: 'data-row',
        sortHeaderClass: 'sort',
} as TableSettings;
```
   
Don't forget import TableSettings:

`import { TableSettings } from 'silly-datatable';`

__Columns settings__
   
`<ngx-silly-datatable [columns]="columns"></ngx-silly-datatable>`

Object `columns` is a array instances of class `Column`. Column object has the  
following properties:

* `id` – Column id for link with source (required).

* `title` – Name of column. Text for header and sorting header of table.

* `headerClass` – Custom class for header of column.

* `cellClass` – Custom class for cells of current column.

* `sortable` – Resolver for sorting current column.

* `prepareCellFunction` – Customization function for prepare data before showed.

All properties are optional except `id`.

For example:

```
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
```

Don't forget import Column:

`import { Column } from 'silly-datatable';`

__Data source__

For place data in a table use

`<ngx-silly-datatable [source]="source"></ngx-silly-datatable>`

Example of table data source:

```
this.source = [
      { id: 1, name: 'test1', description: 'some description' },
      { id: 2, name: 'test2', description: 'some description' },
      { id: 3, name: 'test3', description: 'some description' },
      { id: 4, name: 'test4', description: 'some description' },
      { id: 5, name: 'test5', description: 'some description' },
];
```

__Sorting__

`<ngx-silly-datatable (sort)="sorting($event)"></ngx-silly-datatable>`

__Row clicked event__

`<ngx-silly-datatable (rowClicked)="selected($event)"></ngx-silly-datatable>`

## Silly datatable component attributes

__Input class__

Please look at table settings.

__Disable input__

Disable input for example when loading process in progress.

`<ngx-silly-datatable-paging [disable]="disable"></ngx-silly-datatable-paging>`

__Custom placehoder__

Please look at table settings.


## Silly datatable search component

Tag for insert search field in template:
   
`<ngx-silly-datatable-search></ngx-silly-datatable-search>`

* `searchInputClass` – Class will be added to search `<input>` tag in search   
component.
   
* `prefix` – Html prefix before input form field (use for label for example)
(TemplateRef<any>).
   
* `suffix` – Html suffix after input form field (use for error for example)
(TemplateRef<any>).
   
* `disabled` – Set input form field disable dynamically (boolean).
   
* `placeholder` – Define input form field placeholder.
   
   
For example:
   
```
<ng-template #prefix>
    <label for="search">Search field</label>
    <br>
</ng-template>

<ngx-silly-datatable-search
    placeholder="Search..."
    inputId="search"
    inputClass="search-field"
    [prefix]="prefix"
    [suffix]="suffix"
    [disabled]="loading">
</ngx-silly-datatable-search>

<ng-template #suffix>
    <br>
    <span>required</span>
</ng-template>
```
   
   
## Silly datatable paging component

Tag for insert paging component in template:
   
<ngx-silly-datatable-paging></ngx-silly-datatable-paging>
   
   
__Pagination inputs:__   
   
<ngx-silly-datatable-paging [pagination]="pagination"></ngx-silly-datatable-paging>
   
   
* `pagination` – Init and updated pagination details. Instance of Pagination class.
   
* `settings` – Setting for customization appearance of pagination component
(Instance of PaginationSettings class).
   
   
Don't forget import Pagination and PaginationSettings for init new instance:
   
`import { Pagination, PaginationSettings } from 'silly-datatable';`
   
   
__Pagination settings:__   
   
   
* `infoClass` – Css class for customize information string "Page 1 of 10".
   
* `containerClass` – Css class for pagination div container.
   
* `arrowButtonClass` – Css class for buttons with arrows (start, end, next, prev).
   
* `numberButtonClass` – Css class for buttons with number of page.
   
* `start` – "To Start" button word or symbol.
   
* `prev` – "Prev" button word or symbol.
   
* `next` – "Next" button word or symbol.
   
* `last` – "To Last" button word or symbol.
  
   
For example:
   
```
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
```

__Pagination buttons__
    
Selected page button will be disabled, and added class `active`.
   
   
__Page changed event__
   
<ngx-silly-datatable-paging (changePage)="changePageHandler($event)"></ngx-silly-datatable-paging>
    
$event contains Pagination instance with data for get new page.
   
   
## CSS sorting arrows solution

For add up and down arrows in header of sortable column, can use this css   
solution:  
    
```
.asc:after {
        content: "";
        margin-left: 0.25rem;
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 6px solid black;
      }

.desc:after {
        content: "";
        margin-left: 0.25rem;
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid black;
}
```   
    

