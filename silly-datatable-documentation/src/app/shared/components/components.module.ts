import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GetButtonComponent } from './get-button/get-button.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    GetButtonComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GetButtonComponent,
  ],
})
export class ComponentsModule {

}
