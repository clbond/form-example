import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { validateHexadecimal } from './validators/hexadecimal-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public hexadecimalValue: string = '';

  public dropdownValue: string = '';

  reactiveForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.reactiveForm = fb.group({
      'hexadecimalValue': [this.hexadecimalValue, [Validators.required, Validators.maxLength(10), validateHexadecimal()]],
      'dropdownValue': [this.dropdownValue, [Validators.required]]
    });
  }

  onSubmit(value) {
    alert(`Submit: ${JSON.stringify(value)}`);
  }
  
}
