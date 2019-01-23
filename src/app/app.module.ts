import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SillyDatatableModule } from 'silly-datatable';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';
import { ComponentsModule } from './shared/components/components.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SillyDatatableModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditButtonComponent,
  ],
})
export class AppModule { }
