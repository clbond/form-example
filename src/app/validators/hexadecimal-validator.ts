import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

/**
 * Returns a funcation that validates a hexidecimal value 
 */
export function validateHexadecimal() {
  return (control: AbstractControl) => {
    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      return null;
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return null;
    }

    return { hexadecimal: 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)' };
  };
}

@Directive({
  selector: '[hexadecimal][ngModel],[hexadecimal][formControl],[hexadecimal][formControlName]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => HexadecimalValueValidator), multi: true }
  ]
})
export class HexadecimalValueValidator {
  validator: Function;
  constructor() {
    this.validator = validateHexadecimal();
  }
  
  validate(control: AbstractControl): { [validator: string]: string } {
    return this.validator(control);
  }
}
