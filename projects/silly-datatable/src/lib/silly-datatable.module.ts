import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SillyDatatableComponent } from './silly-datatable.component';
import { ComponentsModule } from './shared/components/components.module';
import { SillyDatatableSearchComponent } from './shared/components/silly-datatable-search/silly-datatable-search.component';
import { SillyDatatablePagingComponent } from './shared/components/silly-datatable-paging/silly-datatable-paging.component';
import { SettingsService } from './shared/services/settings.service';
import { RequestService } from './shared/services/request.service';


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
  ],
  providers: [
    SettingsService,
    RequestService,
  ],
})
export class SillyDatatableModule { }
