import { NgModule } from '@angular/core';

import { EditButtonComponent } from './edit-button/edit-button.component';
import { TableOptionsComponent } from './table-options/table-options.component';
import { SillyDatatableModule } from 'projects/silly-datatable/src/public_api';
import { TablePagingComponent } from './table-paging/table-paging.component';


@NgModule({
  imports: [
    SillyDatatableModule,
  ],
  declarations: [
    EditButtonComponent,
    TableOptionsComponent,
    TablePagingComponent,
  ],
  exports: [
    EditButtonComponent,
    TableOptionsComponent,
    TablePagingComponent,
  ],
})
export class ComponentsModule {

}
