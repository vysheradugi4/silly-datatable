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
          { path: 'table-settings', component: TableSettingsComponent, data: { title: 'Settings' } },
          { path: 'table-params', component: TableParamsComponent, data: { title: 'Table params' } },
          { path: 'sort', component: SortComponent, data: { title: 'Sort' } },
          { path: 'pagination', component: PaginationComponent, data: { title: 'Pagination' } },
          { path: 'columns', component: ColumnsComponent, data: { title: 'Columns' } },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule { }
