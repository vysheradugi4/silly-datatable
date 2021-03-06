import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatableSearchComponent } from './silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './silly-datatable-paging/silly-datatable-paging.component';
import { DirectivesModule } from './../directives/directives.module';
import { SillyDatatableFilterComponent } from './silly-datatable-filter/silly-datatable-filter.component';
import { FilterFieldComponent } from './filter-field/filter-field.component';
import { ComponentCellComponent } from './component-cell/component-cell.component';
import { PipesModule } from './../pipes/pipes.module';
import { SillyDatatableOptionsComponent } from './silly-datatable-options/silly-datatable-options.component';


@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
    SillyDatatableOptionsComponent,
    FilterFieldComponent,
    ComponentCellComponent,
  ],
  exports: [
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
    SillyDatatableOptionsComponent,
    ComponentCellComponent,
  ],
})
export class ComponentsModule {

}
