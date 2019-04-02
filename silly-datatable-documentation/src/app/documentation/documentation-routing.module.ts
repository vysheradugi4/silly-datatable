import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DocumentationComponent } from './documentation.component';
import { InstallComponent } from './install/install.component';


const routes = [
  {
    path: 'documentation',
    component: DocumentationComponent,
    children: [
      { path: 'install', component: InstallComponent, data: { title: 'Install', icon: 'add' } },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule { }
