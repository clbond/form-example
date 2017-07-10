import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import * as components from './components';
import { HexadecimalValueValidator } from './validators';

@NgModule({
  declarations: [
    AppComponent,
    components.FormSelectComponent,
    components.FormTextComponent,
    components.ValidationComponent,
    HexadecimalValueValidator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  exports: [
    components.FormSelectComponent,
    components.FormTextComponent,
    components.ValidationComponent,
    HexadecimalValueValidator
  ]
})
export class AppModule { }
