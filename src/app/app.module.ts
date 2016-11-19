import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  FormTextComponent,
  ValidationMessagesComponent,
} from './components';

import { HexadecimalValueValidator } from './validators';

@NgModule({
  declarations: [
    AppComponent,
    FormTextComponent,
    ValidationMessagesComponent,
    HexadecimalValueValidator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    FormTextComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
