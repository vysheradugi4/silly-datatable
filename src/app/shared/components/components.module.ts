import { NgModule } from '@angular/core';

import { EditButtonComponent } from './edit-button/edit-button.component';
import { TableOptionsComponent } from './table-options/table-options.component';
import { SillyDatatableModule } from 'projects/silly-datatable/src/public_api';


@NgModule({
  imports: [
    SillyDatatableModule,
  ],
  declarations: [
    EditButtonComponent,
    TableOptionsComponent,
  ],
  exports: [
    EditButtonComponent,
    TableOptionsComponent,
  ],
})
export class ComponentsModule {

}
