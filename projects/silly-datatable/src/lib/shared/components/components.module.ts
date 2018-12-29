import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableSearchComponent } from './silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './silly-datatable-paging/silly-datatable-paging.component';
import { DirectivesModule } from './../directives/directives.module';


@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
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
