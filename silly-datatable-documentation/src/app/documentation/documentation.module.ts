import { NgModule } from '@angular/core';

import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { ComponentsModule } from './shared/components/components.module';
import { InstallComponent } from './install/install.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    DocumentationRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    DocumentationComponent,
    InstallComponent,
  ],
})
export class DocumentationModule {

}
