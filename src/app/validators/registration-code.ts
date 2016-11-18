import { Directive } from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
} from '@angular/forms';

@Directive({
  selector: '[validateRegistrationCode][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: RegistrationCodeValidator, multi: true }
  ]
})
export class RegistrationCodeValidator {
  validate(control: AbstractControl): {[validator: string]: string} {
    const expression = /^([0-9a-fA-F]{8})$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return null;
    }

    return {regnCode: 'Invalid registration code'};
  }
}
