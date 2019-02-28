import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondComponent } from 'src/app/second/second.component';
import { FirstComponent } from 'src/app/first/first.component';


const routes: Routes = [
  { path: 'second', component: SecondComponent },
  { path: 'first', component: FirstComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
