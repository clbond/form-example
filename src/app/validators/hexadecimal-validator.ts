import {Directive} from '@angular/core';

import {
  NG_VALIDATORS,
  AbstractControl,
  AsyncValidatorFn,
  Validator
} from '@angular/forms';

import {Observable} from 'rxjs';

@Directive({
  selector: '[hexadecimal][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: HexadecimalValueValidator, multi: true }
  ]
})
export class HexadecimalValueValidator implements Validator {
  validate(control: AbstractControl): Observable<{[validator: string]: string}> {
    const expression = /^([0-9a-fA-F]+)$/i;
    if (!control.value) { // the [required] validator will check presence, not us
      return Observable.of(null);
    }

    const value = control.value.trim();
    if (expression.test(value)) {
      return Observable.of(null);
    }

    // Example of how to do asynchronous validation
    return Observable.create(obs => {
      setImmediate(() => {
        obs.next({hexadecimal: 'Please enter a hexadecimal value (alphanumeric, 0-9 and A-F)'});
        obs.complete();
      });
    });
  }
}
