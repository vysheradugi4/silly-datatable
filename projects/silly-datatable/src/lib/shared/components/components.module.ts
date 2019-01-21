import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableSearchComponent } from './silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './silly-datatable-paging/silly-datatable-paging.component';
import { DirectivesModule } from './../directives/directives.module';
import { SillyDatatableFilterComponent } from './silly-datatable-filter/silly-datatable-filter.component';
import { FilterFieldComponent } from './filter-field/filter-field.component';


@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
    FilterFieldComponent,
  ],
  exports: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
  ],
})
export class ComponentsModule {

}
