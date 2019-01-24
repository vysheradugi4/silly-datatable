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
   
* `dataNotFoundPhrase` – Text under heading when data is not found ('Data not
found' by default).
      
   
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
   
   
__Table params__
   
`<ngx-silly-datatable [tableParams]="tableParams"></ngx-silly-datatable>`
   
The tableParams object is is the instance of TableParams class. Contains current
search string, sort params and pagination params.
   
Don't forget import class:
   
`import { TableParams } from 'silly-datatable';`
   
   
TableParams contains:
   
* `search` – Current search string.
   
* `sort` – Instance of `Sort` class.
   
* `pagination` – Instance of `Pagination` class.


__Sort__
   
Part of TableParams class. This class contains:
   
* `columnName` – The column name what will be used for sorting.
   
* `order` – Order sorting, Can be 'desc' or 'asc'.
   
Sort can be used with pagination and search.
   
   
__Pagination__
   
The part of TableParams class. This class contains:
   
* `page` – Current page number.
   
* `pages` – Number of pages.
   
* `itemsPerPage` – Number of elements on the page.
      
        
__Outputs Events__
   
* `request` – Triggered when user used search input, sort or pagination functional.
Event contains tableParams (see above).


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
    
* `componentCell` – Custom component to display in the cell. Can be used for place buttons,
links, form fields and etc. in cell. Property `row` in this custom component will
be contains current source of row. Make sure that your component added to entryComponents
section in your module.

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
      {
        id: 'action',
        title: 'Action',
        headerClass: 'action',
        cellClass: 'cell',
        sortable: false,
        componentCell: EditButtonComponent,
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
   
   
__Row clicked event__

`<ngx-silly-datatable (rowClicked)="selected($event)"></ngx-silly-datatable>`
   
or for handle double click:
   
```
<ngx-silly-datatable (rowDoubleClicked)="dblClickSelected($event)">
</ngx-silly-datatable>
``` 
   
   
## Silly datatable component attributes

__Input class__

Please look at table settings.

__Disable input__

Disable input for example when loading process in progress.

`<ngx-silly-datatable-paging [disable]="disable"></ngx-silly-datatable-paging>`
   
   
  
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
   
   
## Silly datatable pagination component

Tag for insert paging component in template:
   
`<ngx-silly-datatable-paging></ngx-silly-datatable-paging>`
   
   
__Pagination inputs:__   
   
`<ngx-silly-datatable-paging [settings]="paginationSettings"></ngx-silly-datatable-paging>`
   
   
* `settings` – Setting for customization appearance of pagination component
(Instance of PaginationSettings class).
   
   
Don't forget import PaginationSettings for init new instance:
   
`import { PaginationSettings } from 'silly-datatable';`
   
   
__Pagination settings:__   
   
   
* `infoClass` – Css class for customize information string "Page 1 of 10".
   
* `containerClass` – Css class for pagination div container.
   
* `arrowButtonClass` – Css class for buttons with arrows (start, end, next, prev).
   
* `numberButtonClass` – Css class for buttons with number of page.
   
* `start` – "To Start" button word or symbol ("<<" by default).
   
* `prev` – "Prev" button word or symbol ("<" by default).
   
* `next` – "Next" button word or symbol (">" by default).
   
* `last` – "To Last" button word or symbol (">>" by default).
   
   
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
     
   
## Silly datatable filter component
   
Filter allows to create few form controls for set filtered data request.
   
Tag for insert paging component in template:
   
`<ngx-silly-datatable-filter></ngx-silly-datatable-filter>`
   
   
__Filter inputs:__   
   
```
<ngx-silly-datatable-filter [formFields]="filterFormFields"
    [settings]="filterSettings">
</ngx-silly-datatable-filter>
```

* `settings` – Setting for setup filter appearance (FilterSettings).
   
* `formFields` - Settings for create filter form fields (FilterFormField[]).
   
   
Don't forget import PaginationSettings for init new instance:
   
`import { FilterSettings, FilterFormField } from 'silly-datatable';`
   
   
  public formControlLabel: string;
}
__Filter settings:__   
   
* `formContainerClass` – Div container class of filter.
    
* `cancelButtonTitle` – Cancel button text ("Cancel" by default).
   
* `cancelButtonClass` – Cancel button class.
   
* `submitButtonTitle` – Submit button text("Apply filters" by default).
   
* `submitButtonClass` – Submit button class.
   
* `buttonsContainerClass` – Class of the div container that contains buttons
'Cancel' and 'Apply filters'.
   
* `formElementsContainerClass` – Class of the div container that contains the 
container with buttons and all form fields.
   
         
For example: 
```
this.filterSettings = {
  formContainerClass: 'filter-container',
  cancelButtonClass: 'cancel-button-class',
  cancelButtonTitle: 'Close',
  submitButtonClass: 'submit-button-class',
  submitButtonTitle: 'Submit',
  buttonsContainerClass: 'buttons-container',
  formElementsContainerClass: 'form-container',
} as FilterSettings;
```
   
   
__Filter form fields:__   
   
* `id` – Form field id.
   
* `name` – Form control name.
   
* `type` – Type of input. Available Values: 'textbox', 'dropbox', 'custom'.
   
* `value` – Initial value of form field (optional).
   
* `placeholder` – Placeholder of  form field (optional).
   
* `controlClass` – Form field class (optional).
   
* `formGroupClass` – Combine label and form field (optional).
   
* `controlContainerClass` – Div container of form field class (optional).
   
* `labelContainerClass` – Label container class (optional).
   
* `formControlLabel` – Title in label (optional).
   
* `customInput` – Custom input template (TemplateRef<any>). This is optional field.

* `disabled` – Disable form field.
   
   
For example:
```
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
    placeholder: 'Select type ...',
    value: [
      { key: 1, value: 'Test value 1' },
      { key: 2, value: 'Test value 2' },
      { key: 3, value: 'Test value 3' },
    ],
    controlContainerClass: 'control-container',
    labelContainerClass: 'label-container',
    formControlLabel: 'Dropbox',
  } as FilterFormField,
];
```
   
   
Example of filter custom form control:
```
<ng-template #customInput
    let-filterFieldSettings="filterFieldSettings"
    let-formControl="formControl"
    let-touched="touched">
    <input [formControl]="formControl"
        [id]="filterFieldSettings.id"
        type="text"
        [ngClass]="filterFieldSettings.controlClass"
        [placeholder]="filterFieldSettings.placeholder"
        (blur)="touched()">
</ng-template>
```
   
   
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
   
   
## License
[MIT](LICENSE) license.