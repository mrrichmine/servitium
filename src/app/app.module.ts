import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { AppComponent }                 from './app.component';
import { ColloquimModule }              from "./colloquim/colloquim.module";
import { ColloquimComponent }           from "./colloquim/colloquim.component";
import { Colloquim__MessageComponent }  from "./colloquim/__message/colloquim__message.component";
import { ColloquimService }             from "./colloquim/colloquim.service";

@NgModule({
  declarations: [
    AppComponent,
    ColloquimComponent,
    Colloquim__MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    ColloquimModule
  ],
  providers: [ColloquimService],
  bootstrap: [AppComponent]
})
export class AppModule { }
