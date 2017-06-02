import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';
import { RouterModule, Routes }         from '@angular/router';

import { AppComponent }                 from './app.component';
import { ColloquimModule }              from "./colloquim/colloquim.module";
import { ColloquimComponent }           from "./colloquim/colloquim.component";
import { Colloquim__MessageComponent }  from "./colloquim/__message/colloquim__message.component";
import { ColloquimService }             from "./colloquim/colloquim.service";
import { LegereComponent }              from './legere/legere.component';
import { LegereService }                from "./legere/legere.service";
import { PageNotFoundComponent }        from './app-pagenotfound';
import { WelcomeComponent }             from "./app-welcome";

const appRoutes: Routes = [
  { path: 'colloquim', component: ColloquimComponent },
  { path: 'legere', component: LegereComponent },
  { path: '', component: WelcomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ColloquimComponent,
    Colloquim__MessageComponent,
    LegereComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ColloquimModule
  ],
  exports: [
    RouterModule,
    AppComponent,
    ColloquimComponent,
    LegereComponent,
    WelcomeComponent
  ],
  providers: [
    ColloquimService,
    LegereService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
