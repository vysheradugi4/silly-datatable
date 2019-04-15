import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './shared/components/silly-datatable-paging/silly-datatable-paging.component';
import { SillyDatatableFilterComponent } from './shared/components/silly-datatable-filter/silly-datatable-filter.component';
import { SillyDatatableOptionsComponent } from './shared/components/silly-datatable-options/silly-datatable-options.component';
import { PipesModule } from './shared/pipes/pipes.module';
import { StoreService } from './shared/services/store.service';
import { DirectivesModule } from './shared/directives/directives.module';


@NgModule({
  declarations: [
    SillyDatatableComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    SillyDatatableComponent,
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
    SillyDatatableOptionsComponent,
  ],
  providers: [
    StoreService,
  ],
})
export class SillyDatatableModule { }
