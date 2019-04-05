import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './shared/components/components.module';
import { DocumentationModule } from './documentation/documentation.module';
import { LicenseComponent } from './license/license.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    PageNotFoundComponent,
    LicenseComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ComponentsModule,
    DocumentationModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
