import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SillyDatatableModule } from 'silly-datatable';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';
import { ComponentsModule } from './shared/components/components.module';
import { SecondComponent } from './second/second.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FirstComponent } from './first/first.component';


@NgModule({
  declarations: [
    AppComponent,
    SecondComponent,
    FirstComponent,
  ],
  imports: [
    BrowserModule,
    SillyDatatableModule,
    ReactiveFormsModule,
    ComponentsModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditButtonComponent,
  ],
})
export class AppModule { }
