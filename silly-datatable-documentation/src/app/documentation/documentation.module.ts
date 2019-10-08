import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationComponent } from './documentation.component';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { ComponentsModule } from './shared/components/components.module';
import { HighlightJsModule } from 'ngx-highlight-js';
import { TableComponent } from './table/table.component';
import { InstallComponent } from './install/install.component';
import { IntegrationComponent } from './integration/integration.component';
import { TableParamsComponent } from './table-params/table-params.component';
import { TableSettingsComponent } from './table-settings/table-settings.component';
import { SortComponent } from './sort/sort.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ColumnsComponent } from './columns/columns.component';
import { RowClickedComponent } from './row-clicked/row-clicked.component';
import { CellComponentComponent } from './cell-component/cell-component.component';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { PagingComponent } from './paging/paging.component';
import { PagingSettingsComponent } from './paging-settings/paging-settings.component';
import { QuickSearchSettingsComponent } from './quick-search-settings/quick-search-settings.component';
import { FilterComponent } from './filter/filter.component';
import { FilterSettingsComponent } from './filter-settings/filter-settings.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { FiltersOutputComponent } from './filters-output/filters-output.component';
import { OptionsComponent } from './options/options.component';
import { OptionsSettingsComponent } from './options-settings/options-settings.component';
import { CssTricksComponent } from './css-tricks/css-tricks.component';
import { CustomFiltersDataComponent } from './custom-filters-data/custom-filters-data.component';


@NgModule({
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    ComponentsModule,
    HighlightJsModule,
  ],
  declarations: [
    DocumentationComponent,
    TableComponent,
    InstallComponent,
    IntegrationComponent,
    TableParamsComponent,
    TableSettingsComponent,
    SortComponent,
    PaginationComponent,
    ColumnsComponent,
    RowClickedComponent,
    CellComponentComponent,
    QuickSearchComponent,
    PagingComponent,
    PagingSettingsComponent,
    QuickSearchSettingsComponent,
    FilterComponent,
    FilterSettingsComponent,
    FormFieldsComponent,
    FiltersOutputComponent,
    OptionsComponent,
    OptionsSettingsComponent,
    CssTricksComponent,
    CustomFiltersDataComponent,
  ],
})
export class DocumentationModule {

}
