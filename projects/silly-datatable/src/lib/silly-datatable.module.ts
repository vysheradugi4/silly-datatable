import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './shared/components/silly-datatable-paging/silly-datatable-paging.component';
import { SillyDatatableFilterComponent } from './shared/components/silly-datatable-filter/silly-datatable-filter.component';
import { RequestService } from './shared/services/request.service';
import { FilterControlService } from './shared/services/filter-control.service';


@NgModule({
  declarations: [
    SillyDatatableComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SillyDatatableComponent,
    SillyDatatableSearchComponent,
    SillyDatatablePagingComponent,
    SillyDatatableFilterComponent,
  ],
  providers: [
    RequestService,
    FilterControlService,
  ],
})
export class SillyDatatableModule { }
