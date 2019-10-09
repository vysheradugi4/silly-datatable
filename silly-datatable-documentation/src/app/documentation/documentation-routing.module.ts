import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentationComponent } from './documentation.component';
import { InstallComponent } from './install/install.component';
import { TableComponent } from './table/table.component';
import { IntegrationComponent } from './integration/integration.component';
import { TableParamsComponent } from './table-params/table-params.component';
import { TableSettingsComponent } from './table-settings/table-settings.component';
import { SortComponent } from './sort/sort.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ColumnsComponent } from './columns/columns.component';
import { RowClickedComponent } from './row-clicked/row-clicked.component';
import { CellComponentComponent } from './cell-component/cell-component.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { PagingComponent } from './paging/paging.component';
import { PagingSettingsComponent } from './paging-settings/paging-settings.component';
import { QuickSearchSettingsComponent } from './quick-search-settings/quick-search-settings.component';
import { FilterComponent } from './filter/filter.component';
import { FilterSettingsComponent } from './filter-settings/filter-settings.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FiltersOutputComponent } from './filters-output/filters-output.component';
import { OptionsComponent } from './options/options.component';
import { OptionsSettingsComponent } from './options-settings/options-settings.component';
import { CssTricksComponent } from './css-tricks/css-tricks.component';


const routes = [
  {
    path: 'documentation',
    component: DocumentationComponent,
    children: [
      {
        path: 'install',
        component: InstallComponent,
        data: { title: 'Install', icon: 'add' },
        children: [
          { path: 'integration', component: IntegrationComponent, data: { title: 'Integration' } },
        ],
      },
      {
        path: 'table',
        component: TableComponent,
        data: { title: 'Datatable', icon: 'border_all' },
        children: [
          { path: 'settings', component: TableSettingsComponent, data: { title: 'Settings' } },
          { path: 'table-params', component: TableParamsComponent, data: { title: 'Table params' } },
          { path: 'sort', component: SortComponent, data: { title: 'Sort' } },
          { path: 'pagination', component: PaginationComponent, data: { title: 'Pagination' } },
          { path: 'columns', component: ColumnsComponent, data: { title: 'Columns' } },
          { path: 'row-clicked', component: RowClickedComponent, data: { title: 'Row clicked' } },
          { path: 'cell-component', component: CellComponentComponent, data: { title: 'Cell component' } },
        ],
      },
      {
        path: 'search',
        component: QuickSearchComponent,
        data: { title: 'Quick search', icon: 'search' },
        children: [
          { path: 'settings', component: QuickSearchSettingsComponent, data: { title: 'Settings' } },
        ],
      },
      {
        path: 'paging',
        component: PagingComponent,
        data: { title: 'Pagination', icon: 'library_books' },
        children: [
          { path: 'settings', component: PagingSettingsComponent, data: { title: 'Settings' } },
        ],
      },
      {
        path: 'filters',
        component: FilterComponent,
        data: { title: 'Filters', icon: 'equalizer' },
        children: [
          { path: 'settings', component: FilterSettingsComponent, data: { title: 'Settings' } },
          { path: 'form-fields', component: FormFieldsComponent, data: { title: 'Form fields' } },
          { path: 'output', component: FiltersOutputComponent, data: { title: 'Output' } },
        ],
      },
      {
        path: 'options',
        component: OptionsComponent,
        data: { title: 'Options', icon: 'build' },
        children: [
          { path: 'settings', component: OptionsSettingsComponent, data: { title: 'Settings' } },
        ],
      },
      {
        path: 'css-tricks',
        component: CssTricksComponent,
        data: { title: 'Css Tricks', icon: 'blur_on' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule { }
