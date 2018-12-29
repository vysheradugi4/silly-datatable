import { NgModule } from '@angular/core';
import { SillyDatatableSearchComponent } from './silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './silly-datatable-paging/silly-datatable-paging.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
  ],
  exports: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
  ],
})
export class ComponentsModule {

}
