import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentationComponent } from './documentation.component';
import { InstallComponent } from './install/install.component';
import { TableComponent } from './table/table.component';


const routes = [
  {
    path: 'documentation',
    component: DocumentationComponent,
    children: [
      { path: 'install', component: InstallComponent, data: { title: 'Install', icon: 'add' } },
      { path: 'table', component: TableComponent, data: { title: 'Datatable', icon: 'border_all' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule { }
