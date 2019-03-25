import { NgModule } from '@angular/core';

import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  imports: [
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
})
export class ComponentsModule {

}
