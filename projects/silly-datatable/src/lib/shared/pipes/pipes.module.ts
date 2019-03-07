import { NgModule } from '@angular/core';

import { PageArrayPipe } from './page-array.pipe';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    PageArrayPipe,
    FilterPipe,
  ],
  exports: [
    PageArrayPipe,
    FilterPipe,
  ],
})
export class PipesModule { }
