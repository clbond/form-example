import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
  FormTextComponent,
  ValidationMessagesComponent,
} from './components';

import { RegistrationCodeValidator } from './validators/registration-code';

@NgModule({
  declarations: [
    AppComponent,
    FormTextComponent,
    ValidationMessagesComponent,
    RegistrationCodeValidator,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  exports: [
    FormTextComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
