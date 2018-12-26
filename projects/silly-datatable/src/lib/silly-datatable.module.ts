import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SillyDatatableComponent } from './silly-datatable.component';


@NgModule({
  declarations: [
    SillyDatatableComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SillyDatatableComponent,
  ],
})
export class SillyDatatableModule { }
