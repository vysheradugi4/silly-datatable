import { NgModule } from '@angular/core';
import { SillyDatatableComponent } from './silly-datatable.component';
import { TheadComponent } from './thead/thead.component';
import { TbodyComponent } from './tbody/tbody.component';

@NgModule({
  declarations: [SillyDatatableComponent, TheadComponent, TbodyComponent],
  imports: [
  ],
  exports: [SillyDatatableComponent]
})
export class SillyDatatableModule { }
