import { NgModule } from '@angular/core';
import { PageArrayPipe } from './page-array.pipe';


@NgModule({
  declarations: [
    PageArrayPipe,
  ],
  exports: [
    PageArrayPipe,
  ],
})
export class PipesModule { }
