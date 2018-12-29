# Silly Datatable - Angular 6+ light datatable

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

* `tableClass` - Class will be added to `<table>` tag. Class for all table.   
   
* `headerRowClass` - Class for first row of table for header. Will be added in   
first `<tr>` tag.
   
* `rowClass` - Class for each row in table except first (header) row. Will be   
added to each `<tr>` tag except first.
   
* `sortHeaderClass` - Class for sortable header link. Will be added to `<a>` tag.

* `searchInputClass` - Class will be added to search `<input>` tag in search   
component.
   
All properties are optional. 


Example of settings:
```
this.settings = {
        tableClass: 'table',
        headerRowClass: 'header-row',
        rowClass: 'data-row',
        sortHeaderClass: 'sort',
        searchInputClass: 'search-field',
} as TableSettings;
```
   
Don't forget import TableSettings:
`import { TableSettings } from 'silly-datatable';`

__Columns settings__
   
`<ngx-silly-datatable [columns]="columns"></ngx-silly-datatable>`

Object `columns` is a array instances of class `Column`. Column object has the  
following properties:

* `id` - Column id for link with source (required).

* `title` - Name of column. Text for header and sorting header of table.

* `headerClass` - Custom class for header of column.

* `cellClass` - Custom class for cells of current column.

* `sortable` - Resolver for sorting current column.

* `prepareCellFunction` - Customization function for prepare data before showed.

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
    

