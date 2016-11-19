import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';

import {HexadecimalValueValidator} from './validators';

import * as components from './components';

const allComponents = Object.keys(components).map(k => components[k]);

@NgModule({
  declarations: [
    AppComponent,
    ...allComponents,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    ...allComponents,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
