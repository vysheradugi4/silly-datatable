import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { ComponentsModule } from './shared/components/components.module';
import { InstallComponent } from './install/install.component';
import { HighlightJsModule } from 'ngx-highlight-js';
import { TableComponent } from './table/table.component';


@NgModule({
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    ComponentsModule,
    HighlightJsModule,
  ],
  declarations: [
    DocumentationComponent,
    InstallComponent,
    TableComponent,
  ],
})
export class DocumentationModule {

}
